import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialMigration1706729217329 implements MigrationInterface {
    name = 'InitialMigration1706729217329'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "fazenda" ("id" SERIAL NOT NULL, "nome" character varying(255) NOT NULL, "cidade" character varying(255) NOT NULL, "estado" character varying(2) NOT NULL, "areaTotalHectares" numeric(10,2) NOT NULL, "areaAgricultavelHectares" numeric(10,2) NOT NULL, "areaVegetacaoHectares" numeric(10,2) NOT NULL, "produtorId" integer, CONSTRAINT "PK_0528993051033f09ce373a4b809" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "produtor" ("id" SERIAL NOT NULL, "identificacaoFiscal" character varying(14) NOT NULL, "tipoIdentificacao" character varying(4) NOT NULL, "nome" character varying(255) NOT NULL, CONSTRAINT "UQ_e183c791c2924684aad2db8af3e" UNIQUE ("identificacaoFiscal"), CONSTRAINT "PK_da0beeee09664030b67354e41e2" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "idx_identificacao_fiscal" ON "produtor" ("identificacaoFiscal") `);
        await queryRunner.query(`CREATE TABLE "cultura" ("id" SERIAL NOT NULL, "nome" character varying(255) NOT NULL, CONSTRAINT "UQ_a8d877bcfd82e422cd79bfb9c60" UNIQUE ("nome"), CONSTRAINT "PK_b222a9fa80157cef677c6962646" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "fazenda_culturas" ("cultura_id" integer NOT NULL, "fazenda_id" integer NOT NULL, CONSTRAINT "PK_5426ea15f7fc4ab22791132977e" PRIMARY KEY ("cultura_id", "fazenda_id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_7c331bece733655cb4e858ca8f" ON "fazenda_culturas" ("cultura_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_87048e1bc72337390d50c34879" ON "fazenda_culturas" ("fazenda_id") `);
        await queryRunner.query(`ALTER TABLE "fazenda" ADD CONSTRAINT "FK_85dc20a89e591a222f52e240731" FOREIGN KEY ("produtorId") REFERENCES "produtor"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "fazenda_culturas" ADD CONSTRAINT "FK_7c331bece733655cb4e858ca8f1" FOREIGN KEY ("cultura_id") REFERENCES "cultura"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "fazenda_culturas" ADD CONSTRAINT "FK_87048e1bc72337390d50c348797" FOREIGN KEY ("fazenda_id") REFERENCES "fazenda"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "fazenda_culturas" DROP CONSTRAINT "FK_87048e1bc72337390d50c348797"`);
        await queryRunner.query(`ALTER TABLE "fazenda_culturas" DROP CONSTRAINT "FK_7c331bece733655cb4e858ca8f1"`);
        await queryRunner.query(`ALTER TABLE "fazenda" DROP CONSTRAINT "FK_85dc20a89e591a222f52e240731"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_87048e1bc72337390d50c34879"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_7c331bece733655cb4e858ca8f"`);
        await queryRunner.query(`DROP TABLE "fazenda_culturas"`);
        await queryRunner.query(`DROP TABLE "cultura"`);
        await queryRunner.query(`DROP INDEX "public"."idx_identificacao_fiscal"`);
        await queryRunner.query(`DROP TABLE "produtor"`);
        await queryRunner.query(`DROP TABLE "fazenda"`);
    }

}
