import { eq, inArray } from 'drizzle-orm';
import fs from 'node:fs';

import { BadRequestError } from '@/application/errors';
import { AwsManager, EstablishmentCreate, IToken } from '@/domain/interfaces';
import { drizzle } from '@/infra/drizzle/drizzle';
import {
  establishmentAddresses,
  establishmentCategories,
  establishments,
  establishmentSpecialistPermissions,
  establishmentSpecialists,
} from '@/infra/drizzle/schemas';
import env from '@/main/config/environments/token';

export class EstablishmentCreateService implements EstablishmentCreate {
  constructor(
    private readonly token: IToken,
    private readonly aws: AwsManager,
  ) {}

  async run(
    params: EstablishmentCreate.Params,
  ): Promise<EstablishmentCreate.Response> {
    const {
      name,
      phone,
      categories,
      street,
      neighborhood,
      city,
      state,
      number,
      cep,
      userId,
      description,
      logo,
    } = params;

    const establishmentExists = await drizzle.query.establishments.findFirst({
      where(fields) {
        return eq(fields.phone, phone);
      },
    });

    if (establishmentExists) {
      throw new BadRequestError('Establishment phone already exists.', 21);
    }

    const categoriesSlugs = categories.split(',');

    const categoriesDocs = await drizzle.query.categories.findMany({
      where(fields) {
        return inArray(fields.slug, categoriesSlugs);
      },
    });

    if (!categoriesDocs) {
      throw new BadRequestError(
        'One or more categories provided do not exist.',
      );
    }

    if (categoriesSlugs.length !== categoriesDocs.length) {
      throw new BadRequestError(
        'One or more categories provided do not exist.',
      );
    }

    const { establishmentId, permissions } = await drizzle.transaction(
      async tx => {
        let logoURL: string | null = null;

        if (logo) {
          const fileContent = fs.readFileSync(logo?.path);

          logoURL = await this.aws.uploadS3({
            bucket: 'glowly-bucket',
            key: `uploads/${Date.now()}_${logo?.originalname}`,
            body: fileContent,
            contentType: logo.mimetype,
          });

          fs.unlinkSync(logo.path);
        }

        const [establishment] = await tx
          .insert(establishments)
          .values({ name, phone, description, logoURL })
          .returning({ id: establishments.id });

        await tx.insert(establishmentAddresses).values({
          street,
          neighborhood,
          city,
          state,
          number,
          cep,
          lat: 0,
          long: 0,
          establishmentId: establishment.id,
        });

        await Promise.all(
          categoriesDocs.map(async category => {
            await tx.insert(establishmentCategories).values({
              establishmentId: establishment.id,
              categoryId: category.id,
            });
          }),
        );

        const [establishmentSpecialist] = await tx
          .insert(establishmentSpecialists)
          .values({ userId, establishmentId: establishment.id })
          .returning({ id: establishmentSpecialists.id });

        const permission = await tx.query.permissions.findFirst({
          where(fields) {
            return eq(fields.slug, 'ADMIN');
          },
        });

        if (!permission) {
          throw new BadRequestError('Error in find admin permission', 22);
        }

        await tx.insert(establishmentSpecialistPermissions).values({
          establishmentSpecialistId: establishmentSpecialist.id,
          permissionId: permission.id,
        });

        return { establishmentId: establishment.id, permissions: ['ADMIN'] };
      },
    );

    const token = this.token.createToken({
      payload: {
        sub: userId,
        establishmentId,
        permissions,
      },
      secret: env.secretAuth,
      expiresIn: '7d',
    });

    return {
      token,
    };
  }
}
