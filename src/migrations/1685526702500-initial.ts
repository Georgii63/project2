import { MigrationInterface, QueryRunner } from "typeorm";

export class Initial1685526702500 implements MigrationInterface {
    name = 'Initial1685526702500'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "lightInOrder" ("Light_id" integer NOT NULL, "Order_id" integer NOT NULL, CONSTRAINT "PK_b1df34356cf63501131b01bd777" PRIMARY KEY ("Light_id", "Order_id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_8ed6cfebc536e156570097ecb0" ON "lightInOrder" ("Light_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_5e1e5fd07379f210fa43779f28" ON "lightInOrder" ("Order_id") `);
        await queryRunner.query(`ALTER TABLE "address" DROP COLUMN "orderid"`);
        await queryRunner.query(`ALTER TABLE "lights" DROP COLUMN "orderid"`);
        await queryRunner.query(`ALTER TABLE "orders" DROP COLUMN "lightid"`);
        await queryRunner.query(`CREATE SEQUENCE IF NOT EXISTS "address_id_seq" OWNED BY "address"."id"`);
        await queryRunner.query(`ALTER TABLE "address" ALTER COLUMN "id" SET DEFAULT nextval('"address_id_seq"')`);
        await queryRunner.query(`ALTER TABLE "address" DROP COLUMN "city"`);
        await queryRunner.query(`ALTER TABLE "address" ADD "city" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "address" DROP COLUMN "street"`);
        await queryRunner.query(`ALTER TABLE "address" ADD "street" character varying NOT NULL`);
        await queryRunner.query(`CREATE SEQUENCE IF NOT EXISTS "lights_light_id_seq" OWNED BY "lights"."light_id"`);
        await queryRunner.query(`ALTER TABLE "lights" ALTER COLUMN "light_id" SET DEFAULT nextval('"lights_light_id_seq"')`);
        await queryRunner.query(`ALTER TABLE "lights" DROP COLUMN "name"`);
        await queryRunner.query(`ALTER TABLE "lights" ADD "name" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "lights" ALTER COLUMN "price" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "lights" DROP COLUMN "company"`);
        await queryRunner.query(`ALTER TABLE "lights" ADD "company" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "lights" DROP COLUMN "matireals"`);
        await queryRunner.query(`ALTER TABLE "lights" ADD "matireals" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "lights" DROP COLUMN "info"`);
        await queryRunner.query(`ALTER TABLE "lights" ADD "info" character varying NOT NULL`);
        await queryRunner.query(`CREATE SEQUENCE IF NOT EXISTS "orders_order_id_seq" OWNED BY "orders"."order_id"`);
        await queryRunner.query(`ALTER TABLE "orders" ALTER COLUMN "order_id" SET DEFAULT nextval('"orders_order_id_seq"')`);
        await queryRunner.query(`ALTER TABLE "orders" DROP COLUMN "name"`);
        await queryRunner.query(`ALTER TABLE "orders" ADD "name" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "orders" ALTER COLUMN "price" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "orders" ALTER COLUMN "discount" SET NOT NULL`);
        await queryRunner.query(`CREATE SEQUENCE IF NOT EXISTS "users_id_seq" OWNED BY "users"."id"`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "id" SET DEFAULT nextval('"users_id_seq"')`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "username"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "username" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "password"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "password" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "orders" ADD CONSTRAINT "FK_d39c53244703b8534307adcd073" FOREIGN KEY ("address_id") REFERENCES "address"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "lightInOrder" ADD CONSTRAINT "FK_8ed6cfebc536e156570097ecb0a" FOREIGN KEY ("Light_id") REFERENCES "lights"("light_id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "lightInOrder" ADD CONSTRAINT "FK_5e1e5fd07379f210fa43779f284" FOREIGN KEY ("Order_id") REFERENCES "orders"("order_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "lightInOrder" DROP CONSTRAINT "FK_5e1e5fd07379f210fa43779f284"`);
        await queryRunner.query(`ALTER TABLE "lightInOrder" DROP CONSTRAINT "FK_8ed6cfebc536e156570097ecb0a"`);
        await queryRunner.query(`ALTER TABLE "orders" DROP CONSTRAINT "FK_d39c53244703b8534307adcd073"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "password"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "password" text`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "username"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "username" text`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "id" DROP DEFAULT`);
        await queryRunner.query(`DROP SEQUENCE "users_id_seq"`);
        await queryRunner.query(`ALTER TABLE "orders" ALTER COLUMN "discount" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "orders" ALTER COLUMN "price" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "orders" DROP COLUMN "name"`);
        await queryRunner.query(`ALTER TABLE "orders" ADD "name" text`);
        await queryRunner.query(`ALTER TABLE "orders" ALTER COLUMN "order_id" DROP DEFAULT`);
        await queryRunner.query(`DROP SEQUENCE "orders_order_id_seq"`);
        await queryRunner.query(`ALTER TABLE "lights" DROP COLUMN "info"`);
        await queryRunner.query(`ALTER TABLE "lights" ADD "info" text`);
        await queryRunner.query(`ALTER TABLE "lights" DROP COLUMN "matireals"`);
        await queryRunner.query(`ALTER TABLE "lights" ADD "matireals" text`);
        await queryRunner.query(`ALTER TABLE "lights" DROP COLUMN "company"`);
        await queryRunner.query(`ALTER TABLE "lights" ADD "company" text`);
        await queryRunner.query(`ALTER TABLE "lights" ALTER COLUMN "price" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "lights" DROP COLUMN "name"`);
        await queryRunner.query(`ALTER TABLE "lights" ADD "name" text`);
        await queryRunner.query(`ALTER TABLE "lights" ALTER COLUMN "light_id" DROP DEFAULT`);
        await queryRunner.query(`DROP SEQUENCE "lights_light_id_seq"`);
        await queryRunner.query(`ALTER TABLE "address" DROP COLUMN "street"`);
        await queryRunner.query(`ALTER TABLE "address" ADD "street" text`);
        await queryRunner.query(`ALTER TABLE "address" DROP COLUMN "city"`);
        await queryRunner.query(`ALTER TABLE "address" ADD "city" text`);
        await queryRunner.query(`ALTER TABLE "address" ALTER COLUMN "id" DROP DEFAULT`);
        await queryRunner.query(`DROP SEQUENCE "address_id_seq"`);
        await queryRunner.query(`ALTER TABLE "orders" ADD "lightid" integer`);
        await queryRunner.query(`ALTER TABLE "lights" ADD "orderid" integer`);
        await queryRunner.query(`ALTER TABLE "address" ADD "orderid" integer`);
        await queryRunner.query(`DROP INDEX "public"."IDX_5e1e5fd07379f210fa43779f28"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_8ed6cfebc536e156570097ecb0"`);
        await queryRunner.query(`DROP TABLE "lightInOrder"`);
    }

}
