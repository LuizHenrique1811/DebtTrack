
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model User
 * 
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>
/**
 * Model Debtor
 * 
 */
export type Debtor = $Result.DefaultSelection<Prisma.$DebtorPayload>
/**
 * Model Debit
 * 
 */
export type Debit = $Result.DefaultSelection<Prisma.$DebitPayload>
/**
 * Model Installment
 * 
 */
export type Installment = $Result.DefaultSelection<Prisma.$InstallmentPayload>
/**
 * Model Payment
 * 
 */
export type Payment = $Result.DefaultSelection<Prisma.$PaymentPayload>
/**
 * Model Account
 * 
 */
export type Account = $Result.DefaultSelection<Prisma.$AccountPayload>

/**
 * Enums
 */
export namespace $Enums {
  export const DebitStatus: {
  ACTIVE: 'ACTIVE',
  PAID: 'PAID',
  CANCELLED: 'CANCELLED'
};

export type DebitStatus = (typeof DebitStatus)[keyof typeof DebitStatus]


export const InstallmentStatus: {
  PENDING: 'PENDING',
  PAID: 'PAID',
  PARTIALLY_PAID: 'PARTIALLY_PAID',
  OVERDUE: 'OVERDUE',
  CANCELLED: 'CANCELLED'
};

export type InstallmentStatus = (typeof InstallmentStatus)[keyof typeof InstallmentStatus]

}

export type DebitStatus = $Enums.DebitStatus

export const DebitStatus: typeof $Enums.DebitStatus

export type InstallmentStatus = $Enums.InstallmentStatus

export const InstallmentStatus: typeof $Enums.InstallmentStatus

/**
 * ##  Prisma Client ʲˢ
 * 
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Users
 * const users = await prisma.user.findMany()
 * ```
 *
 * 
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   * 
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Users
   * const users = await prisma.user.findMany()
   * ```
   *
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): void;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

  /**
   * Add a middleware
   * @deprecated since 4.16.0. For new code, prefer client extensions instead.
   * @see https://pris.ly/d/extensions
   */
  $use(cb: Prisma.Middleware): void

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb, ExtArgs>

      /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<ExtArgs>;

  /**
   * `prisma.debtor`: Exposes CRUD operations for the **Debtor** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Debtors
    * const debtors = await prisma.debtor.findMany()
    * ```
    */
  get debtor(): Prisma.DebtorDelegate<ExtArgs>;

  /**
   * `prisma.debit`: Exposes CRUD operations for the **Debit** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Debits
    * const debits = await prisma.debit.findMany()
    * ```
    */
  get debit(): Prisma.DebitDelegate<ExtArgs>;

  /**
   * `prisma.installment`: Exposes CRUD operations for the **Installment** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Installments
    * const installments = await prisma.installment.findMany()
    * ```
    */
  get installment(): Prisma.InstallmentDelegate<ExtArgs>;

  /**
   * `prisma.payment`: Exposes CRUD operations for the **Payment** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Payments
    * const payments = await prisma.payment.findMany()
    * ```
    */
  get payment(): Prisma.PaymentDelegate<ExtArgs>;

  /**
   * `prisma.account`: Exposes CRUD operations for the **Account** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Accounts
    * const accounts = await prisma.account.findMany()
    * ```
    */
  get account(): Prisma.AccountDelegate<ExtArgs>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError
  export import NotFoundError = runtime.NotFoundError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics 
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 5.22.0
   * Query Engine version: 605197351a3c8bdd595af2d2a9bc3025bca48ea2
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion 

  /**
   * Utility Types
   */


  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? K : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    User: 'User',
    Debtor: 'Debtor',
    Debit: 'Debit',
    Installment: 'Installment',
    Payment: 'Payment',
    Account: 'Account'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb extends $Utils.Fn<{extArgs: $Extensions.InternalArgs, clientOptions: PrismaClientOptions }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], this['params']['clientOptions']>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, ClientOptions = {}> = {
    meta: {
      modelProps: "user" | "debtor" | "debit" | "installment" | "payment" | "account"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      User: {
        payload: Prisma.$UserPayload<ExtArgs>
        fields: Prisma.UserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findFirst: {
            args: Prisma.UserFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findMany: {
            args: Prisma.UserFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          create: {
            args: Prisma.UserCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          createMany: {
            args: Prisma.UserCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          delete: {
            args: Prisma.UserDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          update: {
            args: Prisma.UserUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          deleteMany: {
            args: Prisma.UserDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.UserUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUser>
          }
          groupBy: {
            args: Prisma.UserGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserCountArgs<ExtArgs>
            result: $Utils.Optional<UserCountAggregateOutputType> | number
          }
        }
      }
      Debtor: {
        payload: Prisma.$DebtorPayload<ExtArgs>
        fields: Prisma.DebtorFieldRefs
        operations: {
          findUnique: {
            args: Prisma.DebtorFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DebtorPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.DebtorFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DebtorPayload>
          }
          findFirst: {
            args: Prisma.DebtorFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DebtorPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.DebtorFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DebtorPayload>
          }
          findMany: {
            args: Prisma.DebtorFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DebtorPayload>[]
          }
          create: {
            args: Prisma.DebtorCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DebtorPayload>
          }
          createMany: {
            args: Prisma.DebtorCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.DebtorCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DebtorPayload>[]
          }
          delete: {
            args: Prisma.DebtorDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DebtorPayload>
          }
          update: {
            args: Prisma.DebtorUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DebtorPayload>
          }
          deleteMany: {
            args: Prisma.DebtorDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.DebtorUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.DebtorUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DebtorPayload>
          }
          aggregate: {
            args: Prisma.DebtorAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateDebtor>
          }
          groupBy: {
            args: Prisma.DebtorGroupByArgs<ExtArgs>
            result: $Utils.Optional<DebtorGroupByOutputType>[]
          }
          count: {
            args: Prisma.DebtorCountArgs<ExtArgs>
            result: $Utils.Optional<DebtorCountAggregateOutputType> | number
          }
        }
      }
      Debit: {
        payload: Prisma.$DebitPayload<ExtArgs>
        fields: Prisma.DebitFieldRefs
        operations: {
          findUnique: {
            args: Prisma.DebitFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DebitPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.DebitFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DebitPayload>
          }
          findFirst: {
            args: Prisma.DebitFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DebitPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.DebitFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DebitPayload>
          }
          findMany: {
            args: Prisma.DebitFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DebitPayload>[]
          }
          create: {
            args: Prisma.DebitCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DebitPayload>
          }
          createMany: {
            args: Prisma.DebitCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.DebitCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DebitPayload>[]
          }
          delete: {
            args: Prisma.DebitDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DebitPayload>
          }
          update: {
            args: Prisma.DebitUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DebitPayload>
          }
          deleteMany: {
            args: Prisma.DebitDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.DebitUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.DebitUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DebitPayload>
          }
          aggregate: {
            args: Prisma.DebitAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateDebit>
          }
          groupBy: {
            args: Prisma.DebitGroupByArgs<ExtArgs>
            result: $Utils.Optional<DebitGroupByOutputType>[]
          }
          count: {
            args: Prisma.DebitCountArgs<ExtArgs>
            result: $Utils.Optional<DebitCountAggregateOutputType> | number
          }
        }
      }
      Installment: {
        payload: Prisma.$InstallmentPayload<ExtArgs>
        fields: Prisma.InstallmentFieldRefs
        operations: {
          findUnique: {
            args: Prisma.InstallmentFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InstallmentPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.InstallmentFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InstallmentPayload>
          }
          findFirst: {
            args: Prisma.InstallmentFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InstallmentPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.InstallmentFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InstallmentPayload>
          }
          findMany: {
            args: Prisma.InstallmentFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InstallmentPayload>[]
          }
          create: {
            args: Prisma.InstallmentCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InstallmentPayload>
          }
          createMany: {
            args: Prisma.InstallmentCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.InstallmentCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InstallmentPayload>[]
          }
          delete: {
            args: Prisma.InstallmentDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InstallmentPayload>
          }
          update: {
            args: Prisma.InstallmentUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InstallmentPayload>
          }
          deleteMany: {
            args: Prisma.InstallmentDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.InstallmentUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.InstallmentUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InstallmentPayload>
          }
          aggregate: {
            args: Prisma.InstallmentAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateInstallment>
          }
          groupBy: {
            args: Prisma.InstallmentGroupByArgs<ExtArgs>
            result: $Utils.Optional<InstallmentGroupByOutputType>[]
          }
          count: {
            args: Prisma.InstallmentCountArgs<ExtArgs>
            result: $Utils.Optional<InstallmentCountAggregateOutputType> | number
          }
        }
      }
      Payment: {
        payload: Prisma.$PaymentPayload<ExtArgs>
        fields: Prisma.PaymentFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PaymentFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PaymentFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentPayload>
          }
          findFirst: {
            args: Prisma.PaymentFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PaymentFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentPayload>
          }
          findMany: {
            args: Prisma.PaymentFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentPayload>[]
          }
          create: {
            args: Prisma.PaymentCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentPayload>
          }
          createMany: {
            args: Prisma.PaymentCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.PaymentCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentPayload>[]
          }
          delete: {
            args: Prisma.PaymentDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentPayload>
          }
          update: {
            args: Prisma.PaymentUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentPayload>
          }
          deleteMany: {
            args: Prisma.PaymentDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PaymentUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.PaymentUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentPayload>
          }
          aggregate: {
            args: Prisma.PaymentAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePayment>
          }
          groupBy: {
            args: Prisma.PaymentGroupByArgs<ExtArgs>
            result: $Utils.Optional<PaymentGroupByOutputType>[]
          }
          count: {
            args: Prisma.PaymentCountArgs<ExtArgs>
            result: $Utils.Optional<PaymentCountAggregateOutputType> | number
          }
        }
      }
      Account: {
        payload: Prisma.$AccountPayload<ExtArgs>
        fields: Prisma.AccountFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AccountFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AccountFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>
          }
          findFirst: {
            args: Prisma.AccountFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AccountFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>
          }
          findMany: {
            args: Prisma.AccountFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>[]
          }
          create: {
            args: Prisma.AccountCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>
          }
          createMany: {
            args: Prisma.AccountCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.AccountCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>[]
          }
          delete: {
            args: Prisma.AccountDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>
          }
          update: {
            args: Prisma.AccountUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>
          }
          deleteMany: {
            args: Prisma.AccountDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AccountUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.AccountUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>
          }
          aggregate: {
            args: Prisma.AccountAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAccount>
          }
          groupBy: {
            args: Prisma.AccountGroupByArgs<ExtArgs>
            result: $Utils.Optional<AccountGroupByOutputType>[]
          }
          count: {
            args: Prisma.AccountCountArgs<ExtArgs>
            result: $Utils.Optional<AccountCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Defaults to stdout
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events
     * log: [
     *   { emit: 'stdout', level: 'query' },
     *   { emit: 'stdout', level: 'info' },
     *   { emit: 'stdout', level: 'warn' }
     *   { emit: 'stdout', level: 'error' }
     * ]
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
  }


  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
  export type GetEvents<T extends any> = T extends Array<LogLevel | LogDefinition> ?
    GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
    : never

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  /**
   * These options are being passed into the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName
    action: PrismaAction
    args: any
    dataPath: string[]
    runInTransaction: boolean
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => $Utils.JsPromise<T>,
  ) => $Utils.JsPromise<T>

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type UserCountOutputType
   */

  export type UserCountOutputType = {
    debtors: number
    accounts: number
  }

  export type UserCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    debtors?: boolean | UserCountOutputTypeCountDebtorsArgs
    accounts?: boolean | UserCountOutputTypeCountAccountsArgs
  }

  // Custom InputTypes
  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCountOutputType
     */
    select?: UserCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountDebtorsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: DebtorWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountAccountsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AccountWhereInput
  }


  /**
   * Count Type DebtorCountOutputType
   */

  export type DebtorCountOutputType = {
    debts: number
  }

  export type DebtorCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    debts?: boolean | DebtorCountOutputTypeCountDebtsArgs
  }

  // Custom InputTypes
  /**
   * DebtorCountOutputType without action
   */
  export type DebtorCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DebtorCountOutputType
     */
    select?: DebtorCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * DebtorCountOutputType without action
   */
  export type DebtorCountOutputTypeCountDebtsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: DebitWhereInput
  }


  /**
   * Count Type DebitCountOutputType
   */

  export type DebitCountOutputType = {
    installments: number
  }

  export type DebitCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    installments?: boolean | DebitCountOutputTypeCountInstallmentsArgs
  }

  // Custom InputTypes
  /**
   * DebitCountOutputType without action
   */
  export type DebitCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DebitCountOutputType
     */
    select?: DebitCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * DebitCountOutputType without action
   */
  export type DebitCountOutputTypeCountInstallmentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: InstallmentWhereInput
  }


  /**
   * Count Type InstallmentCountOutputType
   */

  export type InstallmentCountOutputType = {
    payments: number
  }

  export type InstallmentCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    payments?: boolean | InstallmentCountOutputTypeCountPaymentsArgs
  }

  // Custom InputTypes
  /**
   * InstallmentCountOutputType without action
   */
  export type InstallmentCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InstallmentCountOutputType
     */
    select?: InstallmentCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * InstallmentCountOutputType without action
   */
  export type InstallmentCountOutputTypeCountPaymentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PaymentWhereInput
  }


  /**
   * Count Type AccountCountOutputType
   */

  export type AccountCountOutputType = {
    debts: number
  }

  export type AccountCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    debts?: boolean | AccountCountOutputTypeCountDebtsArgs
  }

  // Custom InputTypes
  /**
   * AccountCountOutputType without action
   */
  export type AccountCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AccountCountOutputType
     */
    select?: AccountCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * AccountCountOutputType without action
   */
  export type AccountCountOutputTypeCountDebtsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: DebitWhereInput
  }


  /**
   * Models
   */

  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserMinAggregateOutputType = {
    id: string | null
    name: string | null
    email: string | null
    password: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserMaxAggregateOutputType = {
    id: string | null
    name: string | null
    email: string | null
    password: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    name: number
    email: number
    password: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type UserMinAggregateInputType = {
    id?: true
    name?: true
    email?: true
    password?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    name?: true
    email?: true
    password?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    name?: true
    email?: true
    password?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type UserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which User to aggregate.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Users
    **/
    _count?: true | UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType
  }

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
        [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>
  }




  export type UserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
    orderBy?: UserOrderByWithAggregationInput | UserOrderByWithAggregationInput[]
    by: UserScalarFieldEnum[] | UserScalarFieldEnum
    having?: UserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    id: string
    name: string
    email: string
    password: string
    createdAt: Date
    updatedAt: Date
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type UserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    email?: boolean
    password?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    debtors?: boolean | User$debtorsArgs<ExtArgs>
    accounts?: boolean | User$accountsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    email?: boolean
    password?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectScalar = {
    id?: boolean
    name?: boolean
    email?: boolean
    password?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type UserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    debtors?: boolean | User$debtorsArgs<ExtArgs>
    accounts?: boolean | User$accountsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type UserIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {
      debtors: Prisma.$DebtorPayload<ExtArgs>[]
      accounts: Prisma.$AccountPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      email: string
      password: string
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["user"]>
    composites: {}
  }

  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = $Result.GetResult<Prisma.$UserPayload, S>

  type UserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<UserFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface UserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['User'], meta: { name: 'User' } }
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserFindUniqueArgs>(args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserFindFirstArgs>(args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserFindManyArgs>(args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     * 
     */
    create<T extends UserCreateArgs>(args: SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Users.
     * @param {UserCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserCreateManyArgs>(args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Users and returns the data saved in the database.
     * @param {UserCreateManyAndReturnArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Users and only return the `id`
     * const userWithIdOnly = await prisma.user.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserCreateManyAndReturnArgs>(args?: SelectSubset<T, UserCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     * 
     */
    delete<T extends UserDeleteArgs>(args: SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserUpdateArgs>(args: SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserDeleteManyArgs>(args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserUpdateManyArgs>(args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
     */
    upsert<T extends UserUpsertArgs>(args: SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the User model
   */
  readonly fields: UserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    debtors<T extends User$debtorsArgs<ExtArgs> = {}>(args?: Subset<T, User$debtorsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DebtorPayload<ExtArgs>, T, "findMany"> | Null>
    accounts<T extends User$accountsArgs<ExtArgs> = {}>(args?: Subset<T, User$accountsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "findMany"> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the User model
   */ 
  interface UserFieldRefs {
    readonly id: FieldRef<"User", 'String'>
    readonly name: FieldRef<"User", 'String'>
    readonly email: FieldRef<"User", 'String'>
    readonly password: FieldRef<"User", 'String'>
    readonly createdAt: FieldRef<"User", 'DateTime'>
    readonly updatedAt: FieldRef<"User", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * User findUnique
   */
  export type UserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findFirst
   */
  export type UserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findMany
   */
  export type UserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User create
   */
  export type UserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to create a User.
     */
    data: XOR<UserCreateInput, UserUncheckedCreateInput>
  }

  /**
   * User createMany
   */
  export type UserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User createManyAndReturn
   */
  export type UserCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User update
   */
  export type UserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to update a User.
     */
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>
    /**
     * Choose, which User to update.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User updateMany
   */
  export type UserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
  }

  /**
   * User upsert
   */
  export type UserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: UserWhereUniqueInput
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: XOR<UserCreateInput, UserUncheckedCreateInput>
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>
  }

  /**
   * User delete
   */
  export type UserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter which User to delete.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Users to delete
     */
    where?: UserWhereInput
  }

  /**
   * User.debtors
   */
  export type User$debtorsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Debtor
     */
    select?: DebtorSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DebtorInclude<ExtArgs> | null
    where?: DebtorWhereInput
    orderBy?: DebtorOrderByWithRelationInput | DebtorOrderByWithRelationInput[]
    cursor?: DebtorWhereUniqueInput
    take?: number
    skip?: number
    distinct?: DebtorScalarFieldEnum | DebtorScalarFieldEnum[]
  }

  /**
   * User.accounts
   */
  export type User$accountsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    where?: AccountWhereInput
    orderBy?: AccountOrderByWithRelationInput | AccountOrderByWithRelationInput[]
    cursor?: AccountWhereUniqueInput
    take?: number
    skip?: number
    distinct?: AccountScalarFieldEnum | AccountScalarFieldEnum[]
  }

  /**
   * User without action
   */
  export type UserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
  }


  /**
   * Model Debtor
   */

  export type AggregateDebtor = {
    _count: DebtorCountAggregateOutputType | null
    _min: DebtorMinAggregateOutputType | null
    _max: DebtorMaxAggregateOutputType | null
  }

  export type DebtorMinAggregateOutputType = {
    id: string | null
    name: string | null
    email: string | null
    phone: string | null
    userId: string | null
  }

  export type DebtorMaxAggregateOutputType = {
    id: string | null
    name: string | null
    email: string | null
    phone: string | null
    userId: string | null
  }

  export type DebtorCountAggregateOutputType = {
    id: number
    name: number
    email: number
    phone: number
    userId: number
    _all: number
  }


  export type DebtorMinAggregateInputType = {
    id?: true
    name?: true
    email?: true
    phone?: true
    userId?: true
  }

  export type DebtorMaxAggregateInputType = {
    id?: true
    name?: true
    email?: true
    phone?: true
    userId?: true
  }

  export type DebtorCountAggregateInputType = {
    id?: true
    name?: true
    email?: true
    phone?: true
    userId?: true
    _all?: true
  }

  export type DebtorAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Debtor to aggregate.
     */
    where?: DebtorWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Debtors to fetch.
     */
    orderBy?: DebtorOrderByWithRelationInput | DebtorOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: DebtorWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Debtors from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Debtors.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Debtors
    **/
    _count?: true | DebtorCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: DebtorMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: DebtorMaxAggregateInputType
  }

  export type GetDebtorAggregateType<T extends DebtorAggregateArgs> = {
        [P in keyof T & keyof AggregateDebtor]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateDebtor[P]>
      : GetScalarType<T[P], AggregateDebtor[P]>
  }




  export type DebtorGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: DebtorWhereInput
    orderBy?: DebtorOrderByWithAggregationInput | DebtorOrderByWithAggregationInput[]
    by: DebtorScalarFieldEnum[] | DebtorScalarFieldEnum
    having?: DebtorScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: DebtorCountAggregateInputType | true
    _min?: DebtorMinAggregateInputType
    _max?: DebtorMaxAggregateInputType
  }

  export type DebtorGroupByOutputType = {
    id: string
    name: string
    email: string | null
    phone: string | null
    userId: string
    _count: DebtorCountAggregateOutputType | null
    _min: DebtorMinAggregateOutputType | null
    _max: DebtorMaxAggregateOutputType | null
  }

  type GetDebtorGroupByPayload<T extends DebtorGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<DebtorGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof DebtorGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], DebtorGroupByOutputType[P]>
            : GetScalarType<T[P], DebtorGroupByOutputType[P]>
        }
      >
    >


  export type DebtorSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    email?: boolean
    phone?: boolean
    userId?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    debts?: boolean | Debtor$debtsArgs<ExtArgs>
    _count?: boolean | DebtorCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["debtor"]>

  export type DebtorSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    email?: boolean
    phone?: boolean
    userId?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["debtor"]>

  export type DebtorSelectScalar = {
    id?: boolean
    name?: boolean
    email?: boolean
    phone?: boolean
    userId?: boolean
  }

  export type DebtorInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    debts?: boolean | Debtor$debtsArgs<ExtArgs>
    _count?: boolean | DebtorCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type DebtorIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $DebtorPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Debtor"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
      debts: Prisma.$DebitPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      email: string | null
      phone: string | null
      userId: string
    }, ExtArgs["result"]["debtor"]>
    composites: {}
  }

  type DebtorGetPayload<S extends boolean | null | undefined | DebtorDefaultArgs> = $Result.GetResult<Prisma.$DebtorPayload, S>

  type DebtorCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<DebtorFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: DebtorCountAggregateInputType | true
    }

  export interface DebtorDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Debtor'], meta: { name: 'Debtor' } }
    /**
     * Find zero or one Debtor that matches the filter.
     * @param {DebtorFindUniqueArgs} args - Arguments to find a Debtor
     * @example
     * // Get one Debtor
     * const debtor = await prisma.debtor.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends DebtorFindUniqueArgs>(args: SelectSubset<T, DebtorFindUniqueArgs<ExtArgs>>): Prisma__DebtorClient<$Result.GetResult<Prisma.$DebtorPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Debtor that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {DebtorFindUniqueOrThrowArgs} args - Arguments to find a Debtor
     * @example
     * // Get one Debtor
     * const debtor = await prisma.debtor.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends DebtorFindUniqueOrThrowArgs>(args: SelectSubset<T, DebtorFindUniqueOrThrowArgs<ExtArgs>>): Prisma__DebtorClient<$Result.GetResult<Prisma.$DebtorPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Debtor that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DebtorFindFirstArgs} args - Arguments to find a Debtor
     * @example
     * // Get one Debtor
     * const debtor = await prisma.debtor.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends DebtorFindFirstArgs>(args?: SelectSubset<T, DebtorFindFirstArgs<ExtArgs>>): Prisma__DebtorClient<$Result.GetResult<Prisma.$DebtorPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Debtor that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DebtorFindFirstOrThrowArgs} args - Arguments to find a Debtor
     * @example
     * // Get one Debtor
     * const debtor = await prisma.debtor.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends DebtorFindFirstOrThrowArgs>(args?: SelectSubset<T, DebtorFindFirstOrThrowArgs<ExtArgs>>): Prisma__DebtorClient<$Result.GetResult<Prisma.$DebtorPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Debtors that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DebtorFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Debtors
     * const debtors = await prisma.debtor.findMany()
     * 
     * // Get first 10 Debtors
     * const debtors = await prisma.debtor.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const debtorWithIdOnly = await prisma.debtor.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends DebtorFindManyArgs>(args?: SelectSubset<T, DebtorFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DebtorPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Debtor.
     * @param {DebtorCreateArgs} args - Arguments to create a Debtor.
     * @example
     * // Create one Debtor
     * const Debtor = await prisma.debtor.create({
     *   data: {
     *     // ... data to create a Debtor
     *   }
     * })
     * 
     */
    create<T extends DebtorCreateArgs>(args: SelectSubset<T, DebtorCreateArgs<ExtArgs>>): Prisma__DebtorClient<$Result.GetResult<Prisma.$DebtorPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Debtors.
     * @param {DebtorCreateManyArgs} args - Arguments to create many Debtors.
     * @example
     * // Create many Debtors
     * const debtor = await prisma.debtor.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends DebtorCreateManyArgs>(args?: SelectSubset<T, DebtorCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Debtors and returns the data saved in the database.
     * @param {DebtorCreateManyAndReturnArgs} args - Arguments to create many Debtors.
     * @example
     * // Create many Debtors
     * const debtor = await prisma.debtor.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Debtors and only return the `id`
     * const debtorWithIdOnly = await prisma.debtor.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends DebtorCreateManyAndReturnArgs>(args?: SelectSubset<T, DebtorCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DebtorPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Debtor.
     * @param {DebtorDeleteArgs} args - Arguments to delete one Debtor.
     * @example
     * // Delete one Debtor
     * const Debtor = await prisma.debtor.delete({
     *   where: {
     *     // ... filter to delete one Debtor
     *   }
     * })
     * 
     */
    delete<T extends DebtorDeleteArgs>(args: SelectSubset<T, DebtorDeleteArgs<ExtArgs>>): Prisma__DebtorClient<$Result.GetResult<Prisma.$DebtorPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Debtor.
     * @param {DebtorUpdateArgs} args - Arguments to update one Debtor.
     * @example
     * // Update one Debtor
     * const debtor = await prisma.debtor.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends DebtorUpdateArgs>(args: SelectSubset<T, DebtorUpdateArgs<ExtArgs>>): Prisma__DebtorClient<$Result.GetResult<Prisma.$DebtorPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Debtors.
     * @param {DebtorDeleteManyArgs} args - Arguments to filter Debtors to delete.
     * @example
     * // Delete a few Debtors
     * const { count } = await prisma.debtor.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends DebtorDeleteManyArgs>(args?: SelectSubset<T, DebtorDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Debtors.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DebtorUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Debtors
     * const debtor = await prisma.debtor.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends DebtorUpdateManyArgs>(args: SelectSubset<T, DebtorUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Debtor.
     * @param {DebtorUpsertArgs} args - Arguments to update or create a Debtor.
     * @example
     * // Update or create a Debtor
     * const debtor = await prisma.debtor.upsert({
     *   create: {
     *     // ... data to create a Debtor
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Debtor we want to update
     *   }
     * })
     */
    upsert<T extends DebtorUpsertArgs>(args: SelectSubset<T, DebtorUpsertArgs<ExtArgs>>): Prisma__DebtorClient<$Result.GetResult<Prisma.$DebtorPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Debtors.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DebtorCountArgs} args - Arguments to filter Debtors to count.
     * @example
     * // Count the number of Debtors
     * const count = await prisma.debtor.count({
     *   where: {
     *     // ... the filter for the Debtors we want to count
     *   }
     * })
    **/
    count<T extends DebtorCountArgs>(
      args?: Subset<T, DebtorCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], DebtorCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Debtor.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DebtorAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends DebtorAggregateArgs>(args: Subset<T, DebtorAggregateArgs>): Prisma.PrismaPromise<GetDebtorAggregateType<T>>

    /**
     * Group by Debtor.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DebtorGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends DebtorGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: DebtorGroupByArgs['orderBy'] }
        : { orderBy?: DebtorGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, DebtorGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetDebtorGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Debtor model
   */
  readonly fields: DebtorFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Debtor.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__DebtorClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    debts<T extends Debtor$debtsArgs<ExtArgs> = {}>(args?: Subset<T, Debtor$debtsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DebitPayload<ExtArgs>, T, "findMany"> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Debtor model
   */ 
  interface DebtorFieldRefs {
    readonly id: FieldRef<"Debtor", 'String'>
    readonly name: FieldRef<"Debtor", 'String'>
    readonly email: FieldRef<"Debtor", 'String'>
    readonly phone: FieldRef<"Debtor", 'String'>
    readonly userId: FieldRef<"Debtor", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Debtor findUnique
   */
  export type DebtorFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Debtor
     */
    select?: DebtorSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DebtorInclude<ExtArgs> | null
    /**
     * Filter, which Debtor to fetch.
     */
    where: DebtorWhereUniqueInput
  }

  /**
   * Debtor findUniqueOrThrow
   */
  export type DebtorFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Debtor
     */
    select?: DebtorSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DebtorInclude<ExtArgs> | null
    /**
     * Filter, which Debtor to fetch.
     */
    where: DebtorWhereUniqueInput
  }

  /**
   * Debtor findFirst
   */
  export type DebtorFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Debtor
     */
    select?: DebtorSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DebtorInclude<ExtArgs> | null
    /**
     * Filter, which Debtor to fetch.
     */
    where?: DebtorWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Debtors to fetch.
     */
    orderBy?: DebtorOrderByWithRelationInput | DebtorOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Debtors.
     */
    cursor?: DebtorWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Debtors from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Debtors.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Debtors.
     */
    distinct?: DebtorScalarFieldEnum | DebtorScalarFieldEnum[]
  }

  /**
   * Debtor findFirstOrThrow
   */
  export type DebtorFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Debtor
     */
    select?: DebtorSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DebtorInclude<ExtArgs> | null
    /**
     * Filter, which Debtor to fetch.
     */
    where?: DebtorWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Debtors to fetch.
     */
    orderBy?: DebtorOrderByWithRelationInput | DebtorOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Debtors.
     */
    cursor?: DebtorWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Debtors from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Debtors.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Debtors.
     */
    distinct?: DebtorScalarFieldEnum | DebtorScalarFieldEnum[]
  }

  /**
   * Debtor findMany
   */
  export type DebtorFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Debtor
     */
    select?: DebtorSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DebtorInclude<ExtArgs> | null
    /**
     * Filter, which Debtors to fetch.
     */
    where?: DebtorWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Debtors to fetch.
     */
    orderBy?: DebtorOrderByWithRelationInput | DebtorOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Debtors.
     */
    cursor?: DebtorWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Debtors from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Debtors.
     */
    skip?: number
    distinct?: DebtorScalarFieldEnum | DebtorScalarFieldEnum[]
  }

  /**
   * Debtor create
   */
  export type DebtorCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Debtor
     */
    select?: DebtorSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DebtorInclude<ExtArgs> | null
    /**
     * The data needed to create a Debtor.
     */
    data: XOR<DebtorCreateInput, DebtorUncheckedCreateInput>
  }

  /**
   * Debtor createMany
   */
  export type DebtorCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Debtors.
     */
    data: DebtorCreateManyInput | DebtorCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Debtor createManyAndReturn
   */
  export type DebtorCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Debtor
     */
    select?: DebtorSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Debtors.
     */
    data: DebtorCreateManyInput | DebtorCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DebtorIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Debtor update
   */
  export type DebtorUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Debtor
     */
    select?: DebtorSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DebtorInclude<ExtArgs> | null
    /**
     * The data needed to update a Debtor.
     */
    data: XOR<DebtorUpdateInput, DebtorUncheckedUpdateInput>
    /**
     * Choose, which Debtor to update.
     */
    where: DebtorWhereUniqueInput
  }

  /**
   * Debtor updateMany
   */
  export type DebtorUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Debtors.
     */
    data: XOR<DebtorUpdateManyMutationInput, DebtorUncheckedUpdateManyInput>
    /**
     * Filter which Debtors to update
     */
    where?: DebtorWhereInput
  }

  /**
   * Debtor upsert
   */
  export type DebtorUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Debtor
     */
    select?: DebtorSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DebtorInclude<ExtArgs> | null
    /**
     * The filter to search for the Debtor to update in case it exists.
     */
    where: DebtorWhereUniqueInput
    /**
     * In case the Debtor found by the `where` argument doesn't exist, create a new Debtor with this data.
     */
    create: XOR<DebtorCreateInput, DebtorUncheckedCreateInput>
    /**
     * In case the Debtor was found with the provided `where` argument, update it with this data.
     */
    update: XOR<DebtorUpdateInput, DebtorUncheckedUpdateInput>
  }

  /**
   * Debtor delete
   */
  export type DebtorDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Debtor
     */
    select?: DebtorSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DebtorInclude<ExtArgs> | null
    /**
     * Filter which Debtor to delete.
     */
    where: DebtorWhereUniqueInput
  }

  /**
   * Debtor deleteMany
   */
  export type DebtorDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Debtors to delete
     */
    where?: DebtorWhereInput
  }

  /**
   * Debtor.debts
   */
  export type Debtor$debtsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Debit
     */
    select?: DebitSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DebitInclude<ExtArgs> | null
    where?: DebitWhereInput
    orderBy?: DebitOrderByWithRelationInput | DebitOrderByWithRelationInput[]
    cursor?: DebitWhereUniqueInput
    take?: number
    skip?: number
    distinct?: DebitScalarFieldEnum | DebitScalarFieldEnum[]
  }

  /**
   * Debtor without action
   */
  export type DebtorDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Debtor
     */
    select?: DebtorSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DebtorInclude<ExtArgs> | null
  }


  /**
   * Model Debit
   */

  export type AggregateDebit = {
    _count: DebitCountAggregateOutputType | null
    _avg: DebitAvgAggregateOutputType | null
    _sum: DebitSumAggregateOutputType | null
    _min: DebitMinAggregateOutputType | null
    _max: DebitMaxAggregateOutputType | null
  }

  export type DebitAvgAggregateOutputType = {
    totalAmount: Decimal | null
    installmentQty: number | null
    dueDay: number | null
  }

  export type DebitSumAggregateOutputType = {
    totalAmount: Decimal | null
    installmentQty: number | null
    dueDay: number | null
  }

  export type DebitMinAggregateOutputType = {
    id: string | null
    description: string | null
    totalAmount: Decimal | null
    installmentQty: number | null
    startDate: Date | null
    dueDay: number | null
    status: $Enums.DebitStatus | null
    debtorId: string | null
    accountId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type DebitMaxAggregateOutputType = {
    id: string | null
    description: string | null
    totalAmount: Decimal | null
    installmentQty: number | null
    startDate: Date | null
    dueDay: number | null
    status: $Enums.DebitStatus | null
    debtorId: string | null
    accountId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type DebitCountAggregateOutputType = {
    id: number
    description: number
    totalAmount: number
    installmentQty: number
    startDate: number
    dueDay: number
    status: number
    debtorId: number
    accountId: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type DebitAvgAggregateInputType = {
    totalAmount?: true
    installmentQty?: true
    dueDay?: true
  }

  export type DebitSumAggregateInputType = {
    totalAmount?: true
    installmentQty?: true
    dueDay?: true
  }

  export type DebitMinAggregateInputType = {
    id?: true
    description?: true
    totalAmount?: true
    installmentQty?: true
    startDate?: true
    dueDay?: true
    status?: true
    debtorId?: true
    accountId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type DebitMaxAggregateInputType = {
    id?: true
    description?: true
    totalAmount?: true
    installmentQty?: true
    startDate?: true
    dueDay?: true
    status?: true
    debtorId?: true
    accountId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type DebitCountAggregateInputType = {
    id?: true
    description?: true
    totalAmount?: true
    installmentQty?: true
    startDate?: true
    dueDay?: true
    status?: true
    debtorId?: true
    accountId?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type DebitAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Debit to aggregate.
     */
    where?: DebitWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Debits to fetch.
     */
    orderBy?: DebitOrderByWithRelationInput | DebitOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: DebitWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Debits from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Debits.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Debits
    **/
    _count?: true | DebitCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: DebitAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: DebitSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: DebitMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: DebitMaxAggregateInputType
  }

  export type GetDebitAggregateType<T extends DebitAggregateArgs> = {
        [P in keyof T & keyof AggregateDebit]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateDebit[P]>
      : GetScalarType<T[P], AggregateDebit[P]>
  }




  export type DebitGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: DebitWhereInput
    orderBy?: DebitOrderByWithAggregationInput | DebitOrderByWithAggregationInput[]
    by: DebitScalarFieldEnum[] | DebitScalarFieldEnum
    having?: DebitScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: DebitCountAggregateInputType | true
    _avg?: DebitAvgAggregateInputType
    _sum?: DebitSumAggregateInputType
    _min?: DebitMinAggregateInputType
    _max?: DebitMaxAggregateInputType
  }

  export type DebitGroupByOutputType = {
    id: string
    description: string
    totalAmount: Decimal
    installmentQty: number
    startDate: Date
    dueDay: number
    status: $Enums.DebitStatus
    debtorId: string
    accountId: string
    createdAt: Date
    updatedAt: Date
    _count: DebitCountAggregateOutputType | null
    _avg: DebitAvgAggregateOutputType | null
    _sum: DebitSumAggregateOutputType | null
    _min: DebitMinAggregateOutputType | null
    _max: DebitMaxAggregateOutputType | null
  }

  type GetDebitGroupByPayload<T extends DebitGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<DebitGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof DebitGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], DebitGroupByOutputType[P]>
            : GetScalarType<T[P], DebitGroupByOutputType[P]>
        }
      >
    >


  export type DebitSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    description?: boolean
    totalAmount?: boolean
    installmentQty?: boolean
    startDate?: boolean
    dueDay?: boolean
    status?: boolean
    debtorId?: boolean
    accountId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    debtor?: boolean | DebtorDefaultArgs<ExtArgs>
    account?: boolean | AccountDefaultArgs<ExtArgs>
    installments?: boolean | Debit$installmentsArgs<ExtArgs>
    _count?: boolean | DebitCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["debit"]>

  export type DebitSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    description?: boolean
    totalAmount?: boolean
    installmentQty?: boolean
    startDate?: boolean
    dueDay?: boolean
    status?: boolean
    debtorId?: boolean
    accountId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    debtor?: boolean | DebtorDefaultArgs<ExtArgs>
    account?: boolean | AccountDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["debit"]>

  export type DebitSelectScalar = {
    id?: boolean
    description?: boolean
    totalAmount?: boolean
    installmentQty?: boolean
    startDate?: boolean
    dueDay?: boolean
    status?: boolean
    debtorId?: boolean
    accountId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type DebitInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    debtor?: boolean | DebtorDefaultArgs<ExtArgs>
    account?: boolean | AccountDefaultArgs<ExtArgs>
    installments?: boolean | Debit$installmentsArgs<ExtArgs>
    _count?: boolean | DebitCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type DebitIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    debtor?: boolean | DebtorDefaultArgs<ExtArgs>
    account?: boolean | AccountDefaultArgs<ExtArgs>
  }

  export type $DebitPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Debit"
    objects: {
      debtor: Prisma.$DebtorPayload<ExtArgs>
      account: Prisma.$AccountPayload<ExtArgs>
      installments: Prisma.$InstallmentPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      description: string
      totalAmount: Prisma.Decimal
      installmentQty: number
      startDate: Date
      dueDay: number
      status: $Enums.DebitStatus
      debtorId: string
      accountId: string
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["debit"]>
    composites: {}
  }

  type DebitGetPayload<S extends boolean | null | undefined | DebitDefaultArgs> = $Result.GetResult<Prisma.$DebitPayload, S>

  type DebitCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<DebitFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: DebitCountAggregateInputType | true
    }

  export interface DebitDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Debit'], meta: { name: 'Debit' } }
    /**
     * Find zero or one Debit that matches the filter.
     * @param {DebitFindUniqueArgs} args - Arguments to find a Debit
     * @example
     * // Get one Debit
     * const debit = await prisma.debit.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends DebitFindUniqueArgs>(args: SelectSubset<T, DebitFindUniqueArgs<ExtArgs>>): Prisma__DebitClient<$Result.GetResult<Prisma.$DebitPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Debit that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {DebitFindUniqueOrThrowArgs} args - Arguments to find a Debit
     * @example
     * // Get one Debit
     * const debit = await prisma.debit.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends DebitFindUniqueOrThrowArgs>(args: SelectSubset<T, DebitFindUniqueOrThrowArgs<ExtArgs>>): Prisma__DebitClient<$Result.GetResult<Prisma.$DebitPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Debit that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DebitFindFirstArgs} args - Arguments to find a Debit
     * @example
     * // Get one Debit
     * const debit = await prisma.debit.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends DebitFindFirstArgs>(args?: SelectSubset<T, DebitFindFirstArgs<ExtArgs>>): Prisma__DebitClient<$Result.GetResult<Prisma.$DebitPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Debit that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DebitFindFirstOrThrowArgs} args - Arguments to find a Debit
     * @example
     * // Get one Debit
     * const debit = await prisma.debit.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends DebitFindFirstOrThrowArgs>(args?: SelectSubset<T, DebitFindFirstOrThrowArgs<ExtArgs>>): Prisma__DebitClient<$Result.GetResult<Prisma.$DebitPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Debits that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DebitFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Debits
     * const debits = await prisma.debit.findMany()
     * 
     * // Get first 10 Debits
     * const debits = await prisma.debit.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const debitWithIdOnly = await prisma.debit.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends DebitFindManyArgs>(args?: SelectSubset<T, DebitFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DebitPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Debit.
     * @param {DebitCreateArgs} args - Arguments to create a Debit.
     * @example
     * // Create one Debit
     * const Debit = await prisma.debit.create({
     *   data: {
     *     // ... data to create a Debit
     *   }
     * })
     * 
     */
    create<T extends DebitCreateArgs>(args: SelectSubset<T, DebitCreateArgs<ExtArgs>>): Prisma__DebitClient<$Result.GetResult<Prisma.$DebitPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Debits.
     * @param {DebitCreateManyArgs} args - Arguments to create many Debits.
     * @example
     * // Create many Debits
     * const debit = await prisma.debit.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends DebitCreateManyArgs>(args?: SelectSubset<T, DebitCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Debits and returns the data saved in the database.
     * @param {DebitCreateManyAndReturnArgs} args - Arguments to create many Debits.
     * @example
     * // Create many Debits
     * const debit = await prisma.debit.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Debits and only return the `id`
     * const debitWithIdOnly = await prisma.debit.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends DebitCreateManyAndReturnArgs>(args?: SelectSubset<T, DebitCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DebitPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Debit.
     * @param {DebitDeleteArgs} args - Arguments to delete one Debit.
     * @example
     * // Delete one Debit
     * const Debit = await prisma.debit.delete({
     *   where: {
     *     // ... filter to delete one Debit
     *   }
     * })
     * 
     */
    delete<T extends DebitDeleteArgs>(args: SelectSubset<T, DebitDeleteArgs<ExtArgs>>): Prisma__DebitClient<$Result.GetResult<Prisma.$DebitPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Debit.
     * @param {DebitUpdateArgs} args - Arguments to update one Debit.
     * @example
     * // Update one Debit
     * const debit = await prisma.debit.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends DebitUpdateArgs>(args: SelectSubset<T, DebitUpdateArgs<ExtArgs>>): Prisma__DebitClient<$Result.GetResult<Prisma.$DebitPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Debits.
     * @param {DebitDeleteManyArgs} args - Arguments to filter Debits to delete.
     * @example
     * // Delete a few Debits
     * const { count } = await prisma.debit.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends DebitDeleteManyArgs>(args?: SelectSubset<T, DebitDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Debits.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DebitUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Debits
     * const debit = await prisma.debit.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends DebitUpdateManyArgs>(args: SelectSubset<T, DebitUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Debit.
     * @param {DebitUpsertArgs} args - Arguments to update or create a Debit.
     * @example
     * // Update or create a Debit
     * const debit = await prisma.debit.upsert({
     *   create: {
     *     // ... data to create a Debit
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Debit we want to update
     *   }
     * })
     */
    upsert<T extends DebitUpsertArgs>(args: SelectSubset<T, DebitUpsertArgs<ExtArgs>>): Prisma__DebitClient<$Result.GetResult<Prisma.$DebitPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Debits.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DebitCountArgs} args - Arguments to filter Debits to count.
     * @example
     * // Count the number of Debits
     * const count = await prisma.debit.count({
     *   where: {
     *     // ... the filter for the Debits we want to count
     *   }
     * })
    **/
    count<T extends DebitCountArgs>(
      args?: Subset<T, DebitCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], DebitCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Debit.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DebitAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends DebitAggregateArgs>(args: Subset<T, DebitAggregateArgs>): Prisma.PrismaPromise<GetDebitAggregateType<T>>

    /**
     * Group by Debit.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DebitGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends DebitGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: DebitGroupByArgs['orderBy'] }
        : { orderBy?: DebitGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, DebitGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetDebitGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Debit model
   */
  readonly fields: DebitFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Debit.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__DebitClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    debtor<T extends DebtorDefaultArgs<ExtArgs> = {}>(args?: Subset<T, DebtorDefaultArgs<ExtArgs>>): Prisma__DebtorClient<$Result.GetResult<Prisma.$DebtorPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    account<T extends AccountDefaultArgs<ExtArgs> = {}>(args?: Subset<T, AccountDefaultArgs<ExtArgs>>): Prisma__AccountClient<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    installments<T extends Debit$installmentsArgs<ExtArgs> = {}>(args?: Subset<T, Debit$installmentsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$InstallmentPayload<ExtArgs>, T, "findMany"> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Debit model
   */ 
  interface DebitFieldRefs {
    readonly id: FieldRef<"Debit", 'String'>
    readonly description: FieldRef<"Debit", 'String'>
    readonly totalAmount: FieldRef<"Debit", 'Decimal'>
    readonly installmentQty: FieldRef<"Debit", 'Int'>
    readonly startDate: FieldRef<"Debit", 'DateTime'>
    readonly dueDay: FieldRef<"Debit", 'Int'>
    readonly status: FieldRef<"Debit", 'DebitStatus'>
    readonly debtorId: FieldRef<"Debit", 'String'>
    readonly accountId: FieldRef<"Debit", 'String'>
    readonly createdAt: FieldRef<"Debit", 'DateTime'>
    readonly updatedAt: FieldRef<"Debit", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Debit findUnique
   */
  export type DebitFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Debit
     */
    select?: DebitSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DebitInclude<ExtArgs> | null
    /**
     * Filter, which Debit to fetch.
     */
    where: DebitWhereUniqueInput
  }

  /**
   * Debit findUniqueOrThrow
   */
  export type DebitFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Debit
     */
    select?: DebitSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DebitInclude<ExtArgs> | null
    /**
     * Filter, which Debit to fetch.
     */
    where: DebitWhereUniqueInput
  }

  /**
   * Debit findFirst
   */
  export type DebitFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Debit
     */
    select?: DebitSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DebitInclude<ExtArgs> | null
    /**
     * Filter, which Debit to fetch.
     */
    where?: DebitWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Debits to fetch.
     */
    orderBy?: DebitOrderByWithRelationInput | DebitOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Debits.
     */
    cursor?: DebitWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Debits from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Debits.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Debits.
     */
    distinct?: DebitScalarFieldEnum | DebitScalarFieldEnum[]
  }

  /**
   * Debit findFirstOrThrow
   */
  export type DebitFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Debit
     */
    select?: DebitSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DebitInclude<ExtArgs> | null
    /**
     * Filter, which Debit to fetch.
     */
    where?: DebitWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Debits to fetch.
     */
    orderBy?: DebitOrderByWithRelationInput | DebitOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Debits.
     */
    cursor?: DebitWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Debits from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Debits.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Debits.
     */
    distinct?: DebitScalarFieldEnum | DebitScalarFieldEnum[]
  }

  /**
   * Debit findMany
   */
  export type DebitFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Debit
     */
    select?: DebitSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DebitInclude<ExtArgs> | null
    /**
     * Filter, which Debits to fetch.
     */
    where?: DebitWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Debits to fetch.
     */
    orderBy?: DebitOrderByWithRelationInput | DebitOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Debits.
     */
    cursor?: DebitWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Debits from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Debits.
     */
    skip?: number
    distinct?: DebitScalarFieldEnum | DebitScalarFieldEnum[]
  }

  /**
   * Debit create
   */
  export type DebitCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Debit
     */
    select?: DebitSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DebitInclude<ExtArgs> | null
    /**
     * The data needed to create a Debit.
     */
    data: XOR<DebitCreateInput, DebitUncheckedCreateInput>
  }

  /**
   * Debit createMany
   */
  export type DebitCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Debits.
     */
    data: DebitCreateManyInput | DebitCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Debit createManyAndReturn
   */
  export type DebitCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Debit
     */
    select?: DebitSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Debits.
     */
    data: DebitCreateManyInput | DebitCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DebitIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Debit update
   */
  export type DebitUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Debit
     */
    select?: DebitSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DebitInclude<ExtArgs> | null
    /**
     * The data needed to update a Debit.
     */
    data: XOR<DebitUpdateInput, DebitUncheckedUpdateInput>
    /**
     * Choose, which Debit to update.
     */
    where: DebitWhereUniqueInput
  }

  /**
   * Debit updateMany
   */
  export type DebitUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Debits.
     */
    data: XOR<DebitUpdateManyMutationInput, DebitUncheckedUpdateManyInput>
    /**
     * Filter which Debits to update
     */
    where?: DebitWhereInput
  }

  /**
   * Debit upsert
   */
  export type DebitUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Debit
     */
    select?: DebitSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DebitInclude<ExtArgs> | null
    /**
     * The filter to search for the Debit to update in case it exists.
     */
    where: DebitWhereUniqueInput
    /**
     * In case the Debit found by the `where` argument doesn't exist, create a new Debit with this data.
     */
    create: XOR<DebitCreateInput, DebitUncheckedCreateInput>
    /**
     * In case the Debit was found with the provided `where` argument, update it with this data.
     */
    update: XOR<DebitUpdateInput, DebitUncheckedUpdateInput>
  }

  /**
   * Debit delete
   */
  export type DebitDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Debit
     */
    select?: DebitSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DebitInclude<ExtArgs> | null
    /**
     * Filter which Debit to delete.
     */
    where: DebitWhereUniqueInput
  }

  /**
   * Debit deleteMany
   */
  export type DebitDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Debits to delete
     */
    where?: DebitWhereInput
  }

  /**
   * Debit.installments
   */
  export type Debit$installmentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Installment
     */
    select?: InstallmentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InstallmentInclude<ExtArgs> | null
    where?: InstallmentWhereInput
    orderBy?: InstallmentOrderByWithRelationInput | InstallmentOrderByWithRelationInput[]
    cursor?: InstallmentWhereUniqueInput
    take?: number
    skip?: number
    distinct?: InstallmentScalarFieldEnum | InstallmentScalarFieldEnum[]
  }

  /**
   * Debit without action
   */
  export type DebitDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Debit
     */
    select?: DebitSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DebitInclude<ExtArgs> | null
  }


  /**
   * Model Installment
   */

  export type AggregateInstallment = {
    _count: InstallmentCountAggregateOutputType | null
    _avg: InstallmentAvgAggregateOutputType | null
    _sum: InstallmentSumAggregateOutputType | null
    _min: InstallmentMinAggregateOutputType | null
    _max: InstallmentMaxAggregateOutputType | null
  }

  export type InstallmentAvgAggregateOutputType = {
    amount: Decimal | null
  }

  export type InstallmentSumAggregateOutputType = {
    amount: Decimal | null
  }

  export type InstallmentMinAggregateOutputType = {
    id: string | null
    amount: Decimal | null
    dueDate: Date | null
    paidDate: Date | null
    status: $Enums.InstallmentStatus | null
    debitId: string | null
  }

  export type InstallmentMaxAggregateOutputType = {
    id: string | null
    amount: Decimal | null
    dueDate: Date | null
    paidDate: Date | null
    status: $Enums.InstallmentStatus | null
    debitId: string | null
  }

  export type InstallmentCountAggregateOutputType = {
    id: number
    amount: number
    dueDate: number
    paidDate: number
    status: number
    debitId: number
    _all: number
  }


  export type InstallmentAvgAggregateInputType = {
    amount?: true
  }

  export type InstallmentSumAggregateInputType = {
    amount?: true
  }

  export type InstallmentMinAggregateInputType = {
    id?: true
    amount?: true
    dueDate?: true
    paidDate?: true
    status?: true
    debitId?: true
  }

  export type InstallmentMaxAggregateInputType = {
    id?: true
    amount?: true
    dueDate?: true
    paidDate?: true
    status?: true
    debitId?: true
  }

  export type InstallmentCountAggregateInputType = {
    id?: true
    amount?: true
    dueDate?: true
    paidDate?: true
    status?: true
    debitId?: true
    _all?: true
  }

  export type InstallmentAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Installment to aggregate.
     */
    where?: InstallmentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Installments to fetch.
     */
    orderBy?: InstallmentOrderByWithRelationInput | InstallmentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: InstallmentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Installments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Installments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Installments
    **/
    _count?: true | InstallmentCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: InstallmentAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: InstallmentSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: InstallmentMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: InstallmentMaxAggregateInputType
  }

  export type GetInstallmentAggregateType<T extends InstallmentAggregateArgs> = {
        [P in keyof T & keyof AggregateInstallment]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateInstallment[P]>
      : GetScalarType<T[P], AggregateInstallment[P]>
  }




  export type InstallmentGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: InstallmentWhereInput
    orderBy?: InstallmentOrderByWithAggregationInput | InstallmentOrderByWithAggregationInput[]
    by: InstallmentScalarFieldEnum[] | InstallmentScalarFieldEnum
    having?: InstallmentScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: InstallmentCountAggregateInputType | true
    _avg?: InstallmentAvgAggregateInputType
    _sum?: InstallmentSumAggregateInputType
    _min?: InstallmentMinAggregateInputType
    _max?: InstallmentMaxAggregateInputType
  }

  export type InstallmentGroupByOutputType = {
    id: string
    amount: Decimal
    dueDate: Date
    paidDate: Date | null
    status: $Enums.InstallmentStatus
    debitId: string
    _count: InstallmentCountAggregateOutputType | null
    _avg: InstallmentAvgAggregateOutputType | null
    _sum: InstallmentSumAggregateOutputType | null
    _min: InstallmentMinAggregateOutputType | null
    _max: InstallmentMaxAggregateOutputType | null
  }

  type GetInstallmentGroupByPayload<T extends InstallmentGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<InstallmentGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof InstallmentGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], InstallmentGroupByOutputType[P]>
            : GetScalarType<T[P], InstallmentGroupByOutputType[P]>
        }
      >
    >


  export type InstallmentSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    amount?: boolean
    dueDate?: boolean
    paidDate?: boolean
    status?: boolean
    debitId?: boolean
    payments?: boolean | Installment$paymentsArgs<ExtArgs>
    debit?: boolean | DebitDefaultArgs<ExtArgs>
    _count?: boolean | InstallmentCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["installment"]>

  export type InstallmentSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    amount?: boolean
    dueDate?: boolean
    paidDate?: boolean
    status?: boolean
    debitId?: boolean
    debit?: boolean | DebitDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["installment"]>

  export type InstallmentSelectScalar = {
    id?: boolean
    amount?: boolean
    dueDate?: boolean
    paidDate?: boolean
    status?: boolean
    debitId?: boolean
  }

  export type InstallmentInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    payments?: boolean | Installment$paymentsArgs<ExtArgs>
    debit?: boolean | DebitDefaultArgs<ExtArgs>
    _count?: boolean | InstallmentCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type InstallmentIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    debit?: boolean | DebitDefaultArgs<ExtArgs>
  }

  export type $InstallmentPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Installment"
    objects: {
      payments: Prisma.$PaymentPayload<ExtArgs>[]
      debit: Prisma.$DebitPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      amount: Prisma.Decimal
      dueDate: Date
      paidDate: Date | null
      status: $Enums.InstallmentStatus
      debitId: string
    }, ExtArgs["result"]["installment"]>
    composites: {}
  }

  type InstallmentGetPayload<S extends boolean | null | undefined | InstallmentDefaultArgs> = $Result.GetResult<Prisma.$InstallmentPayload, S>

  type InstallmentCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<InstallmentFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: InstallmentCountAggregateInputType | true
    }

  export interface InstallmentDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Installment'], meta: { name: 'Installment' } }
    /**
     * Find zero or one Installment that matches the filter.
     * @param {InstallmentFindUniqueArgs} args - Arguments to find a Installment
     * @example
     * // Get one Installment
     * const installment = await prisma.installment.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends InstallmentFindUniqueArgs>(args: SelectSubset<T, InstallmentFindUniqueArgs<ExtArgs>>): Prisma__InstallmentClient<$Result.GetResult<Prisma.$InstallmentPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Installment that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {InstallmentFindUniqueOrThrowArgs} args - Arguments to find a Installment
     * @example
     * // Get one Installment
     * const installment = await prisma.installment.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends InstallmentFindUniqueOrThrowArgs>(args: SelectSubset<T, InstallmentFindUniqueOrThrowArgs<ExtArgs>>): Prisma__InstallmentClient<$Result.GetResult<Prisma.$InstallmentPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Installment that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InstallmentFindFirstArgs} args - Arguments to find a Installment
     * @example
     * // Get one Installment
     * const installment = await prisma.installment.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends InstallmentFindFirstArgs>(args?: SelectSubset<T, InstallmentFindFirstArgs<ExtArgs>>): Prisma__InstallmentClient<$Result.GetResult<Prisma.$InstallmentPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Installment that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InstallmentFindFirstOrThrowArgs} args - Arguments to find a Installment
     * @example
     * // Get one Installment
     * const installment = await prisma.installment.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends InstallmentFindFirstOrThrowArgs>(args?: SelectSubset<T, InstallmentFindFirstOrThrowArgs<ExtArgs>>): Prisma__InstallmentClient<$Result.GetResult<Prisma.$InstallmentPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Installments that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InstallmentFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Installments
     * const installments = await prisma.installment.findMany()
     * 
     * // Get first 10 Installments
     * const installments = await prisma.installment.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const installmentWithIdOnly = await prisma.installment.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends InstallmentFindManyArgs>(args?: SelectSubset<T, InstallmentFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$InstallmentPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Installment.
     * @param {InstallmentCreateArgs} args - Arguments to create a Installment.
     * @example
     * // Create one Installment
     * const Installment = await prisma.installment.create({
     *   data: {
     *     // ... data to create a Installment
     *   }
     * })
     * 
     */
    create<T extends InstallmentCreateArgs>(args: SelectSubset<T, InstallmentCreateArgs<ExtArgs>>): Prisma__InstallmentClient<$Result.GetResult<Prisma.$InstallmentPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Installments.
     * @param {InstallmentCreateManyArgs} args - Arguments to create many Installments.
     * @example
     * // Create many Installments
     * const installment = await prisma.installment.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends InstallmentCreateManyArgs>(args?: SelectSubset<T, InstallmentCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Installments and returns the data saved in the database.
     * @param {InstallmentCreateManyAndReturnArgs} args - Arguments to create many Installments.
     * @example
     * // Create many Installments
     * const installment = await prisma.installment.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Installments and only return the `id`
     * const installmentWithIdOnly = await prisma.installment.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends InstallmentCreateManyAndReturnArgs>(args?: SelectSubset<T, InstallmentCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$InstallmentPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Installment.
     * @param {InstallmentDeleteArgs} args - Arguments to delete one Installment.
     * @example
     * // Delete one Installment
     * const Installment = await prisma.installment.delete({
     *   where: {
     *     // ... filter to delete one Installment
     *   }
     * })
     * 
     */
    delete<T extends InstallmentDeleteArgs>(args: SelectSubset<T, InstallmentDeleteArgs<ExtArgs>>): Prisma__InstallmentClient<$Result.GetResult<Prisma.$InstallmentPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Installment.
     * @param {InstallmentUpdateArgs} args - Arguments to update one Installment.
     * @example
     * // Update one Installment
     * const installment = await prisma.installment.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends InstallmentUpdateArgs>(args: SelectSubset<T, InstallmentUpdateArgs<ExtArgs>>): Prisma__InstallmentClient<$Result.GetResult<Prisma.$InstallmentPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Installments.
     * @param {InstallmentDeleteManyArgs} args - Arguments to filter Installments to delete.
     * @example
     * // Delete a few Installments
     * const { count } = await prisma.installment.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends InstallmentDeleteManyArgs>(args?: SelectSubset<T, InstallmentDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Installments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InstallmentUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Installments
     * const installment = await prisma.installment.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends InstallmentUpdateManyArgs>(args: SelectSubset<T, InstallmentUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Installment.
     * @param {InstallmentUpsertArgs} args - Arguments to update or create a Installment.
     * @example
     * // Update or create a Installment
     * const installment = await prisma.installment.upsert({
     *   create: {
     *     // ... data to create a Installment
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Installment we want to update
     *   }
     * })
     */
    upsert<T extends InstallmentUpsertArgs>(args: SelectSubset<T, InstallmentUpsertArgs<ExtArgs>>): Prisma__InstallmentClient<$Result.GetResult<Prisma.$InstallmentPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Installments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InstallmentCountArgs} args - Arguments to filter Installments to count.
     * @example
     * // Count the number of Installments
     * const count = await prisma.installment.count({
     *   where: {
     *     // ... the filter for the Installments we want to count
     *   }
     * })
    **/
    count<T extends InstallmentCountArgs>(
      args?: Subset<T, InstallmentCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], InstallmentCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Installment.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InstallmentAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends InstallmentAggregateArgs>(args: Subset<T, InstallmentAggregateArgs>): Prisma.PrismaPromise<GetInstallmentAggregateType<T>>

    /**
     * Group by Installment.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InstallmentGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends InstallmentGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: InstallmentGroupByArgs['orderBy'] }
        : { orderBy?: InstallmentGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, InstallmentGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetInstallmentGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Installment model
   */
  readonly fields: InstallmentFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Installment.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__InstallmentClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    payments<T extends Installment$paymentsArgs<ExtArgs> = {}>(args?: Subset<T, Installment$paymentsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PaymentPayload<ExtArgs>, T, "findMany"> | Null>
    debit<T extends DebitDefaultArgs<ExtArgs> = {}>(args?: Subset<T, DebitDefaultArgs<ExtArgs>>): Prisma__DebitClient<$Result.GetResult<Prisma.$DebitPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Installment model
   */ 
  interface InstallmentFieldRefs {
    readonly id: FieldRef<"Installment", 'String'>
    readonly amount: FieldRef<"Installment", 'Decimal'>
    readonly dueDate: FieldRef<"Installment", 'DateTime'>
    readonly paidDate: FieldRef<"Installment", 'DateTime'>
    readonly status: FieldRef<"Installment", 'InstallmentStatus'>
    readonly debitId: FieldRef<"Installment", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Installment findUnique
   */
  export type InstallmentFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Installment
     */
    select?: InstallmentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InstallmentInclude<ExtArgs> | null
    /**
     * Filter, which Installment to fetch.
     */
    where: InstallmentWhereUniqueInput
  }

  /**
   * Installment findUniqueOrThrow
   */
  export type InstallmentFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Installment
     */
    select?: InstallmentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InstallmentInclude<ExtArgs> | null
    /**
     * Filter, which Installment to fetch.
     */
    where: InstallmentWhereUniqueInput
  }

  /**
   * Installment findFirst
   */
  export type InstallmentFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Installment
     */
    select?: InstallmentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InstallmentInclude<ExtArgs> | null
    /**
     * Filter, which Installment to fetch.
     */
    where?: InstallmentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Installments to fetch.
     */
    orderBy?: InstallmentOrderByWithRelationInput | InstallmentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Installments.
     */
    cursor?: InstallmentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Installments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Installments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Installments.
     */
    distinct?: InstallmentScalarFieldEnum | InstallmentScalarFieldEnum[]
  }

  /**
   * Installment findFirstOrThrow
   */
  export type InstallmentFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Installment
     */
    select?: InstallmentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InstallmentInclude<ExtArgs> | null
    /**
     * Filter, which Installment to fetch.
     */
    where?: InstallmentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Installments to fetch.
     */
    orderBy?: InstallmentOrderByWithRelationInput | InstallmentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Installments.
     */
    cursor?: InstallmentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Installments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Installments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Installments.
     */
    distinct?: InstallmentScalarFieldEnum | InstallmentScalarFieldEnum[]
  }

  /**
   * Installment findMany
   */
  export type InstallmentFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Installment
     */
    select?: InstallmentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InstallmentInclude<ExtArgs> | null
    /**
     * Filter, which Installments to fetch.
     */
    where?: InstallmentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Installments to fetch.
     */
    orderBy?: InstallmentOrderByWithRelationInput | InstallmentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Installments.
     */
    cursor?: InstallmentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Installments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Installments.
     */
    skip?: number
    distinct?: InstallmentScalarFieldEnum | InstallmentScalarFieldEnum[]
  }

  /**
   * Installment create
   */
  export type InstallmentCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Installment
     */
    select?: InstallmentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InstallmentInclude<ExtArgs> | null
    /**
     * The data needed to create a Installment.
     */
    data: XOR<InstallmentCreateInput, InstallmentUncheckedCreateInput>
  }

  /**
   * Installment createMany
   */
  export type InstallmentCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Installments.
     */
    data: InstallmentCreateManyInput | InstallmentCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Installment createManyAndReturn
   */
  export type InstallmentCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Installment
     */
    select?: InstallmentSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Installments.
     */
    data: InstallmentCreateManyInput | InstallmentCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InstallmentIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Installment update
   */
  export type InstallmentUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Installment
     */
    select?: InstallmentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InstallmentInclude<ExtArgs> | null
    /**
     * The data needed to update a Installment.
     */
    data: XOR<InstallmentUpdateInput, InstallmentUncheckedUpdateInput>
    /**
     * Choose, which Installment to update.
     */
    where: InstallmentWhereUniqueInput
  }

  /**
   * Installment updateMany
   */
  export type InstallmentUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Installments.
     */
    data: XOR<InstallmentUpdateManyMutationInput, InstallmentUncheckedUpdateManyInput>
    /**
     * Filter which Installments to update
     */
    where?: InstallmentWhereInput
  }

  /**
   * Installment upsert
   */
  export type InstallmentUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Installment
     */
    select?: InstallmentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InstallmentInclude<ExtArgs> | null
    /**
     * The filter to search for the Installment to update in case it exists.
     */
    where: InstallmentWhereUniqueInput
    /**
     * In case the Installment found by the `where` argument doesn't exist, create a new Installment with this data.
     */
    create: XOR<InstallmentCreateInput, InstallmentUncheckedCreateInput>
    /**
     * In case the Installment was found with the provided `where` argument, update it with this data.
     */
    update: XOR<InstallmentUpdateInput, InstallmentUncheckedUpdateInput>
  }

  /**
   * Installment delete
   */
  export type InstallmentDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Installment
     */
    select?: InstallmentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InstallmentInclude<ExtArgs> | null
    /**
     * Filter which Installment to delete.
     */
    where: InstallmentWhereUniqueInput
  }

  /**
   * Installment deleteMany
   */
  export type InstallmentDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Installments to delete
     */
    where?: InstallmentWhereInput
  }

  /**
   * Installment.payments
   */
  export type Installment$paymentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payment
     */
    select?: PaymentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentInclude<ExtArgs> | null
    where?: PaymentWhereInput
    orderBy?: PaymentOrderByWithRelationInput | PaymentOrderByWithRelationInput[]
    cursor?: PaymentWhereUniqueInput
    take?: number
    skip?: number
    distinct?: PaymentScalarFieldEnum | PaymentScalarFieldEnum[]
  }

  /**
   * Installment without action
   */
  export type InstallmentDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Installment
     */
    select?: InstallmentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InstallmentInclude<ExtArgs> | null
  }


  /**
   * Model Payment
   */

  export type AggregatePayment = {
    _count: PaymentCountAggregateOutputType | null
    _avg: PaymentAvgAggregateOutputType | null
    _sum: PaymentSumAggregateOutputType | null
    _min: PaymentMinAggregateOutputType | null
    _max: PaymentMaxAggregateOutputType | null
  }

  export type PaymentAvgAggregateOutputType = {
    amount: Decimal | null
  }

  export type PaymentSumAggregateOutputType = {
    amount: Decimal | null
  }

  export type PaymentMinAggregateOutputType = {
    id: string | null
    amount: Decimal | null
    paymentDate: Date | null
    installmentId: string | null
  }

  export type PaymentMaxAggregateOutputType = {
    id: string | null
    amount: Decimal | null
    paymentDate: Date | null
    installmentId: string | null
  }

  export type PaymentCountAggregateOutputType = {
    id: number
    amount: number
    paymentDate: number
    installmentId: number
    _all: number
  }


  export type PaymentAvgAggregateInputType = {
    amount?: true
  }

  export type PaymentSumAggregateInputType = {
    amount?: true
  }

  export type PaymentMinAggregateInputType = {
    id?: true
    amount?: true
    paymentDate?: true
    installmentId?: true
  }

  export type PaymentMaxAggregateInputType = {
    id?: true
    amount?: true
    paymentDate?: true
    installmentId?: true
  }

  export type PaymentCountAggregateInputType = {
    id?: true
    amount?: true
    paymentDate?: true
    installmentId?: true
    _all?: true
  }

  export type PaymentAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Payment to aggregate.
     */
    where?: PaymentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Payments to fetch.
     */
    orderBy?: PaymentOrderByWithRelationInput | PaymentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PaymentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Payments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Payments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Payments
    **/
    _count?: true | PaymentCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: PaymentAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: PaymentSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PaymentMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PaymentMaxAggregateInputType
  }

  export type GetPaymentAggregateType<T extends PaymentAggregateArgs> = {
        [P in keyof T & keyof AggregatePayment]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePayment[P]>
      : GetScalarType<T[P], AggregatePayment[P]>
  }




  export type PaymentGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PaymentWhereInput
    orderBy?: PaymentOrderByWithAggregationInput | PaymentOrderByWithAggregationInput[]
    by: PaymentScalarFieldEnum[] | PaymentScalarFieldEnum
    having?: PaymentScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PaymentCountAggregateInputType | true
    _avg?: PaymentAvgAggregateInputType
    _sum?: PaymentSumAggregateInputType
    _min?: PaymentMinAggregateInputType
    _max?: PaymentMaxAggregateInputType
  }

  export type PaymentGroupByOutputType = {
    id: string
    amount: Decimal
    paymentDate: Date
    installmentId: string
    _count: PaymentCountAggregateOutputType | null
    _avg: PaymentAvgAggregateOutputType | null
    _sum: PaymentSumAggregateOutputType | null
    _min: PaymentMinAggregateOutputType | null
    _max: PaymentMaxAggregateOutputType | null
  }

  type GetPaymentGroupByPayload<T extends PaymentGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PaymentGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PaymentGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PaymentGroupByOutputType[P]>
            : GetScalarType<T[P], PaymentGroupByOutputType[P]>
        }
      >
    >


  export type PaymentSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    amount?: boolean
    paymentDate?: boolean
    installmentId?: boolean
    installment?: boolean | InstallmentDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["payment"]>

  export type PaymentSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    amount?: boolean
    paymentDate?: boolean
    installmentId?: boolean
    installment?: boolean | InstallmentDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["payment"]>

  export type PaymentSelectScalar = {
    id?: boolean
    amount?: boolean
    paymentDate?: boolean
    installmentId?: boolean
  }

  export type PaymentInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    installment?: boolean | InstallmentDefaultArgs<ExtArgs>
  }
  export type PaymentIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    installment?: boolean | InstallmentDefaultArgs<ExtArgs>
  }

  export type $PaymentPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Payment"
    objects: {
      installment: Prisma.$InstallmentPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      amount: Prisma.Decimal
      paymentDate: Date
      installmentId: string
    }, ExtArgs["result"]["payment"]>
    composites: {}
  }

  type PaymentGetPayload<S extends boolean | null | undefined | PaymentDefaultArgs> = $Result.GetResult<Prisma.$PaymentPayload, S>

  type PaymentCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<PaymentFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: PaymentCountAggregateInputType | true
    }

  export interface PaymentDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Payment'], meta: { name: 'Payment' } }
    /**
     * Find zero or one Payment that matches the filter.
     * @param {PaymentFindUniqueArgs} args - Arguments to find a Payment
     * @example
     * // Get one Payment
     * const payment = await prisma.payment.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PaymentFindUniqueArgs>(args: SelectSubset<T, PaymentFindUniqueArgs<ExtArgs>>): Prisma__PaymentClient<$Result.GetResult<Prisma.$PaymentPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Payment that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {PaymentFindUniqueOrThrowArgs} args - Arguments to find a Payment
     * @example
     * // Get one Payment
     * const payment = await prisma.payment.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PaymentFindUniqueOrThrowArgs>(args: SelectSubset<T, PaymentFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PaymentClient<$Result.GetResult<Prisma.$PaymentPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Payment that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PaymentFindFirstArgs} args - Arguments to find a Payment
     * @example
     * // Get one Payment
     * const payment = await prisma.payment.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PaymentFindFirstArgs>(args?: SelectSubset<T, PaymentFindFirstArgs<ExtArgs>>): Prisma__PaymentClient<$Result.GetResult<Prisma.$PaymentPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Payment that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PaymentFindFirstOrThrowArgs} args - Arguments to find a Payment
     * @example
     * // Get one Payment
     * const payment = await prisma.payment.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PaymentFindFirstOrThrowArgs>(args?: SelectSubset<T, PaymentFindFirstOrThrowArgs<ExtArgs>>): Prisma__PaymentClient<$Result.GetResult<Prisma.$PaymentPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Payments that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PaymentFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Payments
     * const payments = await prisma.payment.findMany()
     * 
     * // Get first 10 Payments
     * const payments = await prisma.payment.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const paymentWithIdOnly = await prisma.payment.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends PaymentFindManyArgs>(args?: SelectSubset<T, PaymentFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PaymentPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Payment.
     * @param {PaymentCreateArgs} args - Arguments to create a Payment.
     * @example
     * // Create one Payment
     * const Payment = await prisma.payment.create({
     *   data: {
     *     // ... data to create a Payment
     *   }
     * })
     * 
     */
    create<T extends PaymentCreateArgs>(args: SelectSubset<T, PaymentCreateArgs<ExtArgs>>): Prisma__PaymentClient<$Result.GetResult<Prisma.$PaymentPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Payments.
     * @param {PaymentCreateManyArgs} args - Arguments to create many Payments.
     * @example
     * // Create many Payments
     * const payment = await prisma.payment.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PaymentCreateManyArgs>(args?: SelectSubset<T, PaymentCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Payments and returns the data saved in the database.
     * @param {PaymentCreateManyAndReturnArgs} args - Arguments to create many Payments.
     * @example
     * // Create many Payments
     * const payment = await prisma.payment.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Payments and only return the `id`
     * const paymentWithIdOnly = await prisma.payment.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends PaymentCreateManyAndReturnArgs>(args?: SelectSubset<T, PaymentCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PaymentPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Payment.
     * @param {PaymentDeleteArgs} args - Arguments to delete one Payment.
     * @example
     * // Delete one Payment
     * const Payment = await prisma.payment.delete({
     *   where: {
     *     // ... filter to delete one Payment
     *   }
     * })
     * 
     */
    delete<T extends PaymentDeleteArgs>(args: SelectSubset<T, PaymentDeleteArgs<ExtArgs>>): Prisma__PaymentClient<$Result.GetResult<Prisma.$PaymentPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Payment.
     * @param {PaymentUpdateArgs} args - Arguments to update one Payment.
     * @example
     * // Update one Payment
     * const payment = await prisma.payment.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PaymentUpdateArgs>(args: SelectSubset<T, PaymentUpdateArgs<ExtArgs>>): Prisma__PaymentClient<$Result.GetResult<Prisma.$PaymentPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Payments.
     * @param {PaymentDeleteManyArgs} args - Arguments to filter Payments to delete.
     * @example
     * // Delete a few Payments
     * const { count } = await prisma.payment.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PaymentDeleteManyArgs>(args?: SelectSubset<T, PaymentDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Payments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PaymentUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Payments
     * const payment = await prisma.payment.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PaymentUpdateManyArgs>(args: SelectSubset<T, PaymentUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Payment.
     * @param {PaymentUpsertArgs} args - Arguments to update or create a Payment.
     * @example
     * // Update or create a Payment
     * const payment = await prisma.payment.upsert({
     *   create: {
     *     // ... data to create a Payment
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Payment we want to update
     *   }
     * })
     */
    upsert<T extends PaymentUpsertArgs>(args: SelectSubset<T, PaymentUpsertArgs<ExtArgs>>): Prisma__PaymentClient<$Result.GetResult<Prisma.$PaymentPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Payments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PaymentCountArgs} args - Arguments to filter Payments to count.
     * @example
     * // Count the number of Payments
     * const count = await prisma.payment.count({
     *   where: {
     *     // ... the filter for the Payments we want to count
     *   }
     * })
    **/
    count<T extends PaymentCountArgs>(
      args?: Subset<T, PaymentCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PaymentCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Payment.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PaymentAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends PaymentAggregateArgs>(args: Subset<T, PaymentAggregateArgs>): Prisma.PrismaPromise<GetPaymentAggregateType<T>>

    /**
     * Group by Payment.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PaymentGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends PaymentGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PaymentGroupByArgs['orderBy'] }
        : { orderBy?: PaymentGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, PaymentGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPaymentGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Payment model
   */
  readonly fields: PaymentFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Payment.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PaymentClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    installment<T extends InstallmentDefaultArgs<ExtArgs> = {}>(args?: Subset<T, InstallmentDefaultArgs<ExtArgs>>): Prisma__InstallmentClient<$Result.GetResult<Prisma.$InstallmentPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Payment model
   */ 
  interface PaymentFieldRefs {
    readonly id: FieldRef<"Payment", 'String'>
    readonly amount: FieldRef<"Payment", 'Decimal'>
    readonly paymentDate: FieldRef<"Payment", 'DateTime'>
    readonly installmentId: FieldRef<"Payment", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Payment findUnique
   */
  export type PaymentFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payment
     */
    select?: PaymentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentInclude<ExtArgs> | null
    /**
     * Filter, which Payment to fetch.
     */
    where: PaymentWhereUniqueInput
  }

  /**
   * Payment findUniqueOrThrow
   */
  export type PaymentFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payment
     */
    select?: PaymentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentInclude<ExtArgs> | null
    /**
     * Filter, which Payment to fetch.
     */
    where: PaymentWhereUniqueInput
  }

  /**
   * Payment findFirst
   */
  export type PaymentFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payment
     */
    select?: PaymentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentInclude<ExtArgs> | null
    /**
     * Filter, which Payment to fetch.
     */
    where?: PaymentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Payments to fetch.
     */
    orderBy?: PaymentOrderByWithRelationInput | PaymentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Payments.
     */
    cursor?: PaymentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Payments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Payments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Payments.
     */
    distinct?: PaymentScalarFieldEnum | PaymentScalarFieldEnum[]
  }

  /**
   * Payment findFirstOrThrow
   */
  export type PaymentFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payment
     */
    select?: PaymentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentInclude<ExtArgs> | null
    /**
     * Filter, which Payment to fetch.
     */
    where?: PaymentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Payments to fetch.
     */
    orderBy?: PaymentOrderByWithRelationInput | PaymentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Payments.
     */
    cursor?: PaymentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Payments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Payments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Payments.
     */
    distinct?: PaymentScalarFieldEnum | PaymentScalarFieldEnum[]
  }

  /**
   * Payment findMany
   */
  export type PaymentFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payment
     */
    select?: PaymentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentInclude<ExtArgs> | null
    /**
     * Filter, which Payments to fetch.
     */
    where?: PaymentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Payments to fetch.
     */
    orderBy?: PaymentOrderByWithRelationInput | PaymentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Payments.
     */
    cursor?: PaymentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Payments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Payments.
     */
    skip?: number
    distinct?: PaymentScalarFieldEnum | PaymentScalarFieldEnum[]
  }

  /**
   * Payment create
   */
  export type PaymentCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payment
     */
    select?: PaymentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentInclude<ExtArgs> | null
    /**
     * The data needed to create a Payment.
     */
    data: XOR<PaymentCreateInput, PaymentUncheckedCreateInput>
  }

  /**
   * Payment createMany
   */
  export type PaymentCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Payments.
     */
    data: PaymentCreateManyInput | PaymentCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Payment createManyAndReturn
   */
  export type PaymentCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payment
     */
    select?: PaymentSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Payments.
     */
    data: PaymentCreateManyInput | PaymentCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Payment update
   */
  export type PaymentUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payment
     */
    select?: PaymentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentInclude<ExtArgs> | null
    /**
     * The data needed to update a Payment.
     */
    data: XOR<PaymentUpdateInput, PaymentUncheckedUpdateInput>
    /**
     * Choose, which Payment to update.
     */
    where: PaymentWhereUniqueInput
  }

  /**
   * Payment updateMany
   */
  export type PaymentUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Payments.
     */
    data: XOR<PaymentUpdateManyMutationInput, PaymentUncheckedUpdateManyInput>
    /**
     * Filter which Payments to update
     */
    where?: PaymentWhereInput
  }

  /**
   * Payment upsert
   */
  export type PaymentUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payment
     */
    select?: PaymentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentInclude<ExtArgs> | null
    /**
     * The filter to search for the Payment to update in case it exists.
     */
    where: PaymentWhereUniqueInput
    /**
     * In case the Payment found by the `where` argument doesn't exist, create a new Payment with this data.
     */
    create: XOR<PaymentCreateInput, PaymentUncheckedCreateInput>
    /**
     * In case the Payment was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PaymentUpdateInput, PaymentUncheckedUpdateInput>
  }

  /**
   * Payment delete
   */
  export type PaymentDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payment
     */
    select?: PaymentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentInclude<ExtArgs> | null
    /**
     * Filter which Payment to delete.
     */
    where: PaymentWhereUniqueInput
  }

  /**
   * Payment deleteMany
   */
  export type PaymentDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Payments to delete
     */
    where?: PaymentWhereInput
  }

  /**
   * Payment without action
   */
  export type PaymentDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payment
     */
    select?: PaymentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentInclude<ExtArgs> | null
  }


  /**
   * Model Account
   */

  export type AggregateAccount = {
    _count: AccountCountAggregateOutputType | null
    _min: AccountMinAggregateOutputType | null
    _max: AccountMaxAggregateOutputType | null
  }

  export type AccountMinAggregateOutputType = {
    id: string | null
    name: string | null
    createdAt: Date | null
    updatedAt: Date | null
    userId: string | null
  }

  export type AccountMaxAggregateOutputType = {
    id: string | null
    name: string | null
    createdAt: Date | null
    updatedAt: Date | null
    userId: string | null
  }

  export type AccountCountAggregateOutputType = {
    id: number
    name: number
    createdAt: number
    updatedAt: number
    userId: number
    _all: number
  }


  export type AccountMinAggregateInputType = {
    id?: true
    name?: true
    createdAt?: true
    updatedAt?: true
    userId?: true
  }

  export type AccountMaxAggregateInputType = {
    id?: true
    name?: true
    createdAt?: true
    updatedAt?: true
    userId?: true
  }

  export type AccountCountAggregateInputType = {
    id?: true
    name?: true
    createdAt?: true
    updatedAt?: true
    userId?: true
    _all?: true
  }

  export type AccountAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Account to aggregate.
     */
    where?: AccountWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Accounts to fetch.
     */
    orderBy?: AccountOrderByWithRelationInput | AccountOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AccountWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Accounts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Accounts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Accounts
    **/
    _count?: true | AccountCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AccountMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AccountMaxAggregateInputType
  }

  export type GetAccountAggregateType<T extends AccountAggregateArgs> = {
        [P in keyof T & keyof AggregateAccount]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAccount[P]>
      : GetScalarType<T[P], AggregateAccount[P]>
  }




  export type AccountGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AccountWhereInput
    orderBy?: AccountOrderByWithAggregationInput | AccountOrderByWithAggregationInput[]
    by: AccountScalarFieldEnum[] | AccountScalarFieldEnum
    having?: AccountScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AccountCountAggregateInputType | true
    _min?: AccountMinAggregateInputType
    _max?: AccountMaxAggregateInputType
  }

  export type AccountGroupByOutputType = {
    id: string
    name: string
    createdAt: Date
    updatedAt: Date
    userId: string
    _count: AccountCountAggregateOutputType | null
    _min: AccountMinAggregateOutputType | null
    _max: AccountMaxAggregateOutputType | null
  }

  type GetAccountGroupByPayload<T extends AccountGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AccountGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AccountGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AccountGroupByOutputType[P]>
            : GetScalarType<T[P], AccountGroupByOutputType[P]>
        }
      >
    >


  export type AccountSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    userId?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    debts?: boolean | Account$debtsArgs<ExtArgs>
    _count?: boolean | AccountCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["account"]>

  export type AccountSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    userId?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["account"]>

  export type AccountSelectScalar = {
    id?: boolean
    name?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    userId?: boolean
  }

  export type AccountInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    debts?: boolean | Account$debtsArgs<ExtArgs>
    _count?: boolean | AccountCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type AccountIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $AccountPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Account"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
      debts: Prisma.$DebitPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      createdAt: Date
      updatedAt: Date
      userId: string
    }, ExtArgs["result"]["account"]>
    composites: {}
  }

  type AccountGetPayload<S extends boolean | null | undefined | AccountDefaultArgs> = $Result.GetResult<Prisma.$AccountPayload, S>

  type AccountCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<AccountFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: AccountCountAggregateInputType | true
    }

  export interface AccountDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Account'], meta: { name: 'Account' } }
    /**
     * Find zero or one Account that matches the filter.
     * @param {AccountFindUniqueArgs} args - Arguments to find a Account
     * @example
     * // Get one Account
     * const account = await prisma.account.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AccountFindUniqueArgs>(args: SelectSubset<T, AccountFindUniqueArgs<ExtArgs>>): Prisma__AccountClient<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Account that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {AccountFindUniqueOrThrowArgs} args - Arguments to find a Account
     * @example
     * // Get one Account
     * const account = await prisma.account.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AccountFindUniqueOrThrowArgs>(args: SelectSubset<T, AccountFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AccountClient<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Account that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountFindFirstArgs} args - Arguments to find a Account
     * @example
     * // Get one Account
     * const account = await prisma.account.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AccountFindFirstArgs>(args?: SelectSubset<T, AccountFindFirstArgs<ExtArgs>>): Prisma__AccountClient<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Account that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountFindFirstOrThrowArgs} args - Arguments to find a Account
     * @example
     * // Get one Account
     * const account = await prisma.account.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AccountFindFirstOrThrowArgs>(args?: SelectSubset<T, AccountFindFirstOrThrowArgs<ExtArgs>>): Prisma__AccountClient<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Accounts that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Accounts
     * const accounts = await prisma.account.findMany()
     * 
     * // Get first 10 Accounts
     * const accounts = await prisma.account.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const accountWithIdOnly = await prisma.account.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AccountFindManyArgs>(args?: SelectSubset<T, AccountFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Account.
     * @param {AccountCreateArgs} args - Arguments to create a Account.
     * @example
     * // Create one Account
     * const Account = await prisma.account.create({
     *   data: {
     *     // ... data to create a Account
     *   }
     * })
     * 
     */
    create<T extends AccountCreateArgs>(args: SelectSubset<T, AccountCreateArgs<ExtArgs>>): Prisma__AccountClient<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Accounts.
     * @param {AccountCreateManyArgs} args - Arguments to create many Accounts.
     * @example
     * // Create many Accounts
     * const account = await prisma.account.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AccountCreateManyArgs>(args?: SelectSubset<T, AccountCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Accounts and returns the data saved in the database.
     * @param {AccountCreateManyAndReturnArgs} args - Arguments to create many Accounts.
     * @example
     * // Create many Accounts
     * const account = await prisma.account.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Accounts and only return the `id`
     * const accountWithIdOnly = await prisma.account.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends AccountCreateManyAndReturnArgs>(args?: SelectSubset<T, AccountCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Account.
     * @param {AccountDeleteArgs} args - Arguments to delete one Account.
     * @example
     * // Delete one Account
     * const Account = await prisma.account.delete({
     *   where: {
     *     // ... filter to delete one Account
     *   }
     * })
     * 
     */
    delete<T extends AccountDeleteArgs>(args: SelectSubset<T, AccountDeleteArgs<ExtArgs>>): Prisma__AccountClient<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Account.
     * @param {AccountUpdateArgs} args - Arguments to update one Account.
     * @example
     * // Update one Account
     * const account = await prisma.account.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AccountUpdateArgs>(args: SelectSubset<T, AccountUpdateArgs<ExtArgs>>): Prisma__AccountClient<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Accounts.
     * @param {AccountDeleteManyArgs} args - Arguments to filter Accounts to delete.
     * @example
     * // Delete a few Accounts
     * const { count } = await prisma.account.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AccountDeleteManyArgs>(args?: SelectSubset<T, AccountDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Accounts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Accounts
     * const account = await prisma.account.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AccountUpdateManyArgs>(args: SelectSubset<T, AccountUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Account.
     * @param {AccountUpsertArgs} args - Arguments to update or create a Account.
     * @example
     * // Update or create a Account
     * const account = await prisma.account.upsert({
     *   create: {
     *     // ... data to create a Account
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Account we want to update
     *   }
     * })
     */
    upsert<T extends AccountUpsertArgs>(args: SelectSubset<T, AccountUpsertArgs<ExtArgs>>): Prisma__AccountClient<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Accounts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountCountArgs} args - Arguments to filter Accounts to count.
     * @example
     * // Count the number of Accounts
     * const count = await prisma.account.count({
     *   where: {
     *     // ... the filter for the Accounts we want to count
     *   }
     * })
    **/
    count<T extends AccountCountArgs>(
      args?: Subset<T, AccountCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AccountCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Account.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends AccountAggregateArgs>(args: Subset<T, AccountAggregateArgs>): Prisma.PrismaPromise<GetAccountAggregateType<T>>

    /**
     * Group by Account.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends AccountGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AccountGroupByArgs['orderBy'] }
        : { orderBy?: AccountGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, AccountGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAccountGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Account model
   */
  readonly fields: AccountFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Account.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AccountClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    debts<T extends Account$debtsArgs<ExtArgs> = {}>(args?: Subset<T, Account$debtsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DebitPayload<ExtArgs>, T, "findMany"> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Account model
   */ 
  interface AccountFieldRefs {
    readonly id: FieldRef<"Account", 'String'>
    readonly name: FieldRef<"Account", 'String'>
    readonly createdAt: FieldRef<"Account", 'DateTime'>
    readonly updatedAt: FieldRef<"Account", 'DateTime'>
    readonly userId: FieldRef<"Account", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Account findUnique
   */
  export type AccountFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * Filter, which Account to fetch.
     */
    where: AccountWhereUniqueInput
  }

  /**
   * Account findUniqueOrThrow
   */
  export type AccountFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * Filter, which Account to fetch.
     */
    where: AccountWhereUniqueInput
  }

  /**
   * Account findFirst
   */
  export type AccountFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * Filter, which Account to fetch.
     */
    where?: AccountWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Accounts to fetch.
     */
    orderBy?: AccountOrderByWithRelationInput | AccountOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Accounts.
     */
    cursor?: AccountWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Accounts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Accounts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Accounts.
     */
    distinct?: AccountScalarFieldEnum | AccountScalarFieldEnum[]
  }

  /**
   * Account findFirstOrThrow
   */
  export type AccountFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * Filter, which Account to fetch.
     */
    where?: AccountWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Accounts to fetch.
     */
    orderBy?: AccountOrderByWithRelationInput | AccountOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Accounts.
     */
    cursor?: AccountWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Accounts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Accounts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Accounts.
     */
    distinct?: AccountScalarFieldEnum | AccountScalarFieldEnum[]
  }

  /**
   * Account findMany
   */
  export type AccountFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * Filter, which Accounts to fetch.
     */
    where?: AccountWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Accounts to fetch.
     */
    orderBy?: AccountOrderByWithRelationInput | AccountOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Accounts.
     */
    cursor?: AccountWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Accounts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Accounts.
     */
    skip?: number
    distinct?: AccountScalarFieldEnum | AccountScalarFieldEnum[]
  }

  /**
   * Account create
   */
  export type AccountCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * The data needed to create a Account.
     */
    data: XOR<AccountCreateInput, AccountUncheckedCreateInput>
  }

  /**
   * Account createMany
   */
  export type AccountCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Accounts.
     */
    data: AccountCreateManyInput | AccountCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Account createManyAndReturn
   */
  export type AccountCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Accounts.
     */
    data: AccountCreateManyInput | AccountCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Account update
   */
  export type AccountUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * The data needed to update a Account.
     */
    data: XOR<AccountUpdateInput, AccountUncheckedUpdateInput>
    /**
     * Choose, which Account to update.
     */
    where: AccountWhereUniqueInput
  }

  /**
   * Account updateMany
   */
  export type AccountUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Accounts.
     */
    data: XOR<AccountUpdateManyMutationInput, AccountUncheckedUpdateManyInput>
    /**
     * Filter which Accounts to update
     */
    where?: AccountWhereInput
  }

  /**
   * Account upsert
   */
  export type AccountUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * The filter to search for the Account to update in case it exists.
     */
    where: AccountWhereUniqueInput
    /**
     * In case the Account found by the `where` argument doesn't exist, create a new Account with this data.
     */
    create: XOR<AccountCreateInput, AccountUncheckedCreateInput>
    /**
     * In case the Account was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AccountUpdateInput, AccountUncheckedUpdateInput>
  }

  /**
   * Account delete
   */
  export type AccountDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * Filter which Account to delete.
     */
    where: AccountWhereUniqueInput
  }

  /**
   * Account deleteMany
   */
  export type AccountDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Accounts to delete
     */
    where?: AccountWhereInput
  }

  /**
   * Account.debts
   */
  export type Account$debtsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Debit
     */
    select?: DebitSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DebitInclude<ExtArgs> | null
    where?: DebitWhereInput
    orderBy?: DebitOrderByWithRelationInput | DebitOrderByWithRelationInput[]
    cursor?: DebitWhereUniqueInput
    take?: number
    skip?: number
    distinct?: DebitScalarFieldEnum | DebitScalarFieldEnum[]
  }

  /**
   * Account without action
   */
  export type AccountDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const UserScalarFieldEnum: {
    id: 'id',
    name: 'name',
    email: 'email',
    password: 'password',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const DebtorScalarFieldEnum: {
    id: 'id',
    name: 'name',
    email: 'email',
    phone: 'phone',
    userId: 'userId'
  };

  export type DebtorScalarFieldEnum = (typeof DebtorScalarFieldEnum)[keyof typeof DebtorScalarFieldEnum]


  export const DebitScalarFieldEnum: {
    id: 'id',
    description: 'description',
    totalAmount: 'totalAmount',
    installmentQty: 'installmentQty',
    startDate: 'startDate',
    dueDay: 'dueDay',
    status: 'status',
    debtorId: 'debtorId',
    accountId: 'accountId',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type DebitScalarFieldEnum = (typeof DebitScalarFieldEnum)[keyof typeof DebitScalarFieldEnum]


  export const InstallmentScalarFieldEnum: {
    id: 'id',
    amount: 'amount',
    dueDate: 'dueDate',
    paidDate: 'paidDate',
    status: 'status',
    debitId: 'debitId'
  };

  export type InstallmentScalarFieldEnum = (typeof InstallmentScalarFieldEnum)[keyof typeof InstallmentScalarFieldEnum]


  export const PaymentScalarFieldEnum: {
    id: 'id',
    amount: 'amount',
    paymentDate: 'paymentDate',
    installmentId: 'installmentId'
  };

  export type PaymentScalarFieldEnum = (typeof PaymentScalarFieldEnum)[keyof typeof PaymentScalarFieldEnum]


  export const AccountScalarFieldEnum: {
    id: 'id',
    name: 'name',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    userId: 'userId'
  };

  export type AccountScalarFieldEnum = (typeof AccountScalarFieldEnum)[keyof typeof AccountScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references 
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Decimal'
   */
  export type DecimalFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Decimal'>
    


  /**
   * Reference to a field of type 'Decimal[]'
   */
  export type ListDecimalFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Decimal[]'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'DebitStatus'
   */
  export type EnumDebitStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DebitStatus'>
    


  /**
   * Reference to a field of type 'DebitStatus[]'
   */
  export type ListEnumDebitStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DebitStatus[]'>
    


  /**
   * Reference to a field of type 'InstallmentStatus'
   */
  export type EnumInstallmentStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'InstallmentStatus'>
    


  /**
   * Reference to a field of type 'InstallmentStatus[]'
   */
  export type ListEnumInstallmentStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'InstallmentStatus[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    
  /**
   * Deep Input Types
   */


  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    id?: StringFilter<"User"> | string
    name?: StringFilter<"User"> | string
    email?: StringFilter<"User"> | string
    password?: StringFilter<"User"> | string
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    debtors?: DebtorListRelationFilter
    accounts?: AccountListRelationFilter
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    password?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    debtors?: DebtorOrderByRelationAggregateInput
    accounts?: AccountOrderByRelationAggregateInput
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    email?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    name?: StringFilter<"User"> | string
    password?: StringFilter<"User"> | string
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    debtors?: DebtorListRelationFilter
    accounts?: AccountListRelationFilter
  }, "id" | "email">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    password?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: UserCountOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"User"> | string
    name?: StringWithAggregatesFilter<"User"> | string
    email?: StringWithAggregatesFilter<"User"> | string
    password?: StringWithAggregatesFilter<"User"> | string
    createdAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
  }

  export type DebtorWhereInput = {
    AND?: DebtorWhereInput | DebtorWhereInput[]
    OR?: DebtorWhereInput[]
    NOT?: DebtorWhereInput | DebtorWhereInput[]
    id?: StringFilter<"Debtor"> | string
    name?: StringFilter<"Debtor"> | string
    email?: StringNullableFilter<"Debtor"> | string | null
    phone?: StringNullableFilter<"Debtor"> | string | null
    userId?: StringFilter<"Debtor"> | string
    user?: XOR<UserRelationFilter, UserWhereInput>
    debts?: DebitListRelationFilter
  }

  export type DebtorOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrderInput | SortOrder
    phone?: SortOrderInput | SortOrder
    userId?: SortOrder
    user?: UserOrderByWithRelationInput
    debts?: DebitOrderByRelationAggregateInput
  }

  export type DebtorWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: DebtorWhereInput | DebtorWhereInput[]
    OR?: DebtorWhereInput[]
    NOT?: DebtorWhereInput | DebtorWhereInput[]
    name?: StringFilter<"Debtor"> | string
    email?: StringNullableFilter<"Debtor"> | string | null
    phone?: StringNullableFilter<"Debtor"> | string | null
    userId?: StringFilter<"Debtor"> | string
    user?: XOR<UserRelationFilter, UserWhereInput>
    debts?: DebitListRelationFilter
  }, "id">

  export type DebtorOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrderInput | SortOrder
    phone?: SortOrderInput | SortOrder
    userId?: SortOrder
    _count?: DebtorCountOrderByAggregateInput
    _max?: DebtorMaxOrderByAggregateInput
    _min?: DebtorMinOrderByAggregateInput
  }

  export type DebtorScalarWhereWithAggregatesInput = {
    AND?: DebtorScalarWhereWithAggregatesInput | DebtorScalarWhereWithAggregatesInput[]
    OR?: DebtorScalarWhereWithAggregatesInput[]
    NOT?: DebtorScalarWhereWithAggregatesInput | DebtorScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Debtor"> | string
    name?: StringWithAggregatesFilter<"Debtor"> | string
    email?: StringNullableWithAggregatesFilter<"Debtor"> | string | null
    phone?: StringNullableWithAggregatesFilter<"Debtor"> | string | null
    userId?: StringWithAggregatesFilter<"Debtor"> | string
  }

  export type DebitWhereInput = {
    AND?: DebitWhereInput | DebitWhereInput[]
    OR?: DebitWhereInput[]
    NOT?: DebitWhereInput | DebitWhereInput[]
    id?: StringFilter<"Debit"> | string
    description?: StringFilter<"Debit"> | string
    totalAmount?: DecimalFilter<"Debit"> | Decimal | DecimalJsLike | number | string
    installmentQty?: IntFilter<"Debit"> | number
    startDate?: DateTimeFilter<"Debit"> | Date | string
    dueDay?: IntFilter<"Debit"> | number
    status?: EnumDebitStatusFilter<"Debit"> | $Enums.DebitStatus
    debtorId?: StringFilter<"Debit"> | string
    accountId?: StringFilter<"Debit"> | string
    createdAt?: DateTimeFilter<"Debit"> | Date | string
    updatedAt?: DateTimeFilter<"Debit"> | Date | string
    debtor?: XOR<DebtorRelationFilter, DebtorWhereInput>
    account?: XOR<AccountRelationFilter, AccountWhereInput>
    installments?: InstallmentListRelationFilter
  }

  export type DebitOrderByWithRelationInput = {
    id?: SortOrder
    description?: SortOrder
    totalAmount?: SortOrder
    installmentQty?: SortOrder
    startDate?: SortOrder
    dueDay?: SortOrder
    status?: SortOrder
    debtorId?: SortOrder
    accountId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    debtor?: DebtorOrderByWithRelationInput
    account?: AccountOrderByWithRelationInput
    installments?: InstallmentOrderByRelationAggregateInput
  }

  export type DebitWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: DebitWhereInput | DebitWhereInput[]
    OR?: DebitWhereInput[]
    NOT?: DebitWhereInput | DebitWhereInput[]
    description?: StringFilter<"Debit"> | string
    totalAmount?: DecimalFilter<"Debit"> | Decimal | DecimalJsLike | number | string
    installmentQty?: IntFilter<"Debit"> | number
    startDate?: DateTimeFilter<"Debit"> | Date | string
    dueDay?: IntFilter<"Debit"> | number
    status?: EnumDebitStatusFilter<"Debit"> | $Enums.DebitStatus
    debtorId?: StringFilter<"Debit"> | string
    accountId?: StringFilter<"Debit"> | string
    createdAt?: DateTimeFilter<"Debit"> | Date | string
    updatedAt?: DateTimeFilter<"Debit"> | Date | string
    debtor?: XOR<DebtorRelationFilter, DebtorWhereInput>
    account?: XOR<AccountRelationFilter, AccountWhereInput>
    installments?: InstallmentListRelationFilter
  }, "id">

  export type DebitOrderByWithAggregationInput = {
    id?: SortOrder
    description?: SortOrder
    totalAmount?: SortOrder
    installmentQty?: SortOrder
    startDate?: SortOrder
    dueDay?: SortOrder
    status?: SortOrder
    debtorId?: SortOrder
    accountId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: DebitCountOrderByAggregateInput
    _avg?: DebitAvgOrderByAggregateInput
    _max?: DebitMaxOrderByAggregateInput
    _min?: DebitMinOrderByAggregateInput
    _sum?: DebitSumOrderByAggregateInput
  }

  export type DebitScalarWhereWithAggregatesInput = {
    AND?: DebitScalarWhereWithAggregatesInput | DebitScalarWhereWithAggregatesInput[]
    OR?: DebitScalarWhereWithAggregatesInput[]
    NOT?: DebitScalarWhereWithAggregatesInput | DebitScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Debit"> | string
    description?: StringWithAggregatesFilter<"Debit"> | string
    totalAmount?: DecimalWithAggregatesFilter<"Debit"> | Decimal | DecimalJsLike | number | string
    installmentQty?: IntWithAggregatesFilter<"Debit"> | number
    startDate?: DateTimeWithAggregatesFilter<"Debit"> | Date | string
    dueDay?: IntWithAggregatesFilter<"Debit"> | number
    status?: EnumDebitStatusWithAggregatesFilter<"Debit"> | $Enums.DebitStatus
    debtorId?: StringWithAggregatesFilter<"Debit"> | string
    accountId?: StringWithAggregatesFilter<"Debit"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Debit"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Debit"> | Date | string
  }

  export type InstallmentWhereInput = {
    AND?: InstallmentWhereInput | InstallmentWhereInput[]
    OR?: InstallmentWhereInput[]
    NOT?: InstallmentWhereInput | InstallmentWhereInput[]
    id?: StringFilter<"Installment"> | string
    amount?: DecimalFilter<"Installment"> | Decimal | DecimalJsLike | number | string
    dueDate?: DateTimeFilter<"Installment"> | Date | string
    paidDate?: DateTimeNullableFilter<"Installment"> | Date | string | null
    status?: EnumInstallmentStatusFilter<"Installment"> | $Enums.InstallmentStatus
    debitId?: StringFilter<"Installment"> | string
    payments?: PaymentListRelationFilter
    debit?: XOR<DebitRelationFilter, DebitWhereInput>
  }

  export type InstallmentOrderByWithRelationInput = {
    id?: SortOrder
    amount?: SortOrder
    dueDate?: SortOrder
    paidDate?: SortOrderInput | SortOrder
    status?: SortOrder
    debitId?: SortOrder
    payments?: PaymentOrderByRelationAggregateInput
    debit?: DebitOrderByWithRelationInput
  }

  export type InstallmentWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: InstallmentWhereInput | InstallmentWhereInput[]
    OR?: InstallmentWhereInput[]
    NOT?: InstallmentWhereInput | InstallmentWhereInput[]
    amount?: DecimalFilter<"Installment"> | Decimal | DecimalJsLike | number | string
    dueDate?: DateTimeFilter<"Installment"> | Date | string
    paidDate?: DateTimeNullableFilter<"Installment"> | Date | string | null
    status?: EnumInstallmentStatusFilter<"Installment"> | $Enums.InstallmentStatus
    debitId?: StringFilter<"Installment"> | string
    payments?: PaymentListRelationFilter
    debit?: XOR<DebitRelationFilter, DebitWhereInput>
  }, "id">

  export type InstallmentOrderByWithAggregationInput = {
    id?: SortOrder
    amount?: SortOrder
    dueDate?: SortOrder
    paidDate?: SortOrderInput | SortOrder
    status?: SortOrder
    debitId?: SortOrder
    _count?: InstallmentCountOrderByAggregateInput
    _avg?: InstallmentAvgOrderByAggregateInput
    _max?: InstallmentMaxOrderByAggregateInput
    _min?: InstallmentMinOrderByAggregateInput
    _sum?: InstallmentSumOrderByAggregateInput
  }

  export type InstallmentScalarWhereWithAggregatesInput = {
    AND?: InstallmentScalarWhereWithAggregatesInput | InstallmentScalarWhereWithAggregatesInput[]
    OR?: InstallmentScalarWhereWithAggregatesInput[]
    NOT?: InstallmentScalarWhereWithAggregatesInput | InstallmentScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Installment"> | string
    amount?: DecimalWithAggregatesFilter<"Installment"> | Decimal | DecimalJsLike | number | string
    dueDate?: DateTimeWithAggregatesFilter<"Installment"> | Date | string
    paidDate?: DateTimeNullableWithAggregatesFilter<"Installment"> | Date | string | null
    status?: EnumInstallmentStatusWithAggregatesFilter<"Installment"> | $Enums.InstallmentStatus
    debitId?: StringWithAggregatesFilter<"Installment"> | string
  }

  export type PaymentWhereInput = {
    AND?: PaymentWhereInput | PaymentWhereInput[]
    OR?: PaymentWhereInput[]
    NOT?: PaymentWhereInput | PaymentWhereInput[]
    id?: StringFilter<"Payment"> | string
    amount?: DecimalFilter<"Payment"> | Decimal | DecimalJsLike | number | string
    paymentDate?: DateTimeFilter<"Payment"> | Date | string
    installmentId?: StringFilter<"Payment"> | string
    installment?: XOR<InstallmentRelationFilter, InstallmentWhereInput>
  }

  export type PaymentOrderByWithRelationInput = {
    id?: SortOrder
    amount?: SortOrder
    paymentDate?: SortOrder
    installmentId?: SortOrder
    installment?: InstallmentOrderByWithRelationInput
  }

  export type PaymentWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: PaymentWhereInput | PaymentWhereInput[]
    OR?: PaymentWhereInput[]
    NOT?: PaymentWhereInput | PaymentWhereInput[]
    amount?: DecimalFilter<"Payment"> | Decimal | DecimalJsLike | number | string
    paymentDate?: DateTimeFilter<"Payment"> | Date | string
    installmentId?: StringFilter<"Payment"> | string
    installment?: XOR<InstallmentRelationFilter, InstallmentWhereInput>
  }, "id">

  export type PaymentOrderByWithAggregationInput = {
    id?: SortOrder
    amount?: SortOrder
    paymentDate?: SortOrder
    installmentId?: SortOrder
    _count?: PaymentCountOrderByAggregateInput
    _avg?: PaymentAvgOrderByAggregateInput
    _max?: PaymentMaxOrderByAggregateInput
    _min?: PaymentMinOrderByAggregateInput
    _sum?: PaymentSumOrderByAggregateInput
  }

  export type PaymentScalarWhereWithAggregatesInput = {
    AND?: PaymentScalarWhereWithAggregatesInput | PaymentScalarWhereWithAggregatesInput[]
    OR?: PaymentScalarWhereWithAggregatesInput[]
    NOT?: PaymentScalarWhereWithAggregatesInput | PaymentScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Payment"> | string
    amount?: DecimalWithAggregatesFilter<"Payment"> | Decimal | DecimalJsLike | number | string
    paymentDate?: DateTimeWithAggregatesFilter<"Payment"> | Date | string
    installmentId?: StringWithAggregatesFilter<"Payment"> | string
  }

  export type AccountWhereInput = {
    AND?: AccountWhereInput | AccountWhereInput[]
    OR?: AccountWhereInput[]
    NOT?: AccountWhereInput | AccountWhereInput[]
    id?: StringFilter<"Account"> | string
    name?: StringFilter<"Account"> | string
    createdAt?: DateTimeFilter<"Account"> | Date | string
    updatedAt?: DateTimeFilter<"Account"> | Date | string
    userId?: StringFilter<"Account"> | string
    user?: XOR<UserRelationFilter, UserWhereInput>
    debts?: DebitListRelationFilter
  }

  export type AccountOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    userId?: SortOrder
    user?: UserOrderByWithRelationInput
    debts?: DebitOrderByRelationAggregateInput
  }

  export type AccountWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: AccountWhereInput | AccountWhereInput[]
    OR?: AccountWhereInput[]
    NOT?: AccountWhereInput | AccountWhereInput[]
    name?: StringFilter<"Account"> | string
    createdAt?: DateTimeFilter<"Account"> | Date | string
    updatedAt?: DateTimeFilter<"Account"> | Date | string
    userId?: StringFilter<"Account"> | string
    user?: XOR<UserRelationFilter, UserWhereInput>
    debts?: DebitListRelationFilter
  }, "id">

  export type AccountOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    userId?: SortOrder
    _count?: AccountCountOrderByAggregateInput
    _max?: AccountMaxOrderByAggregateInput
    _min?: AccountMinOrderByAggregateInput
  }

  export type AccountScalarWhereWithAggregatesInput = {
    AND?: AccountScalarWhereWithAggregatesInput | AccountScalarWhereWithAggregatesInput[]
    OR?: AccountScalarWhereWithAggregatesInput[]
    NOT?: AccountScalarWhereWithAggregatesInput | AccountScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Account"> | string
    name?: StringWithAggregatesFilter<"Account"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Account"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Account"> | Date | string
    userId?: StringWithAggregatesFilter<"Account"> | string
  }

  export type UserCreateInput = {
    id?: string
    name: string
    email: string
    password: string
    createdAt?: Date | string
    updatedAt?: Date | string
    debtors?: DebtorCreateNestedManyWithoutUserInput
    accounts?: AccountCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateInput = {
    id?: string
    name: string
    email: string
    password: string
    createdAt?: Date | string
    updatedAt?: Date | string
    debtors?: DebtorUncheckedCreateNestedManyWithoutUserInput
    accounts?: AccountUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    debtors?: DebtorUpdateManyWithoutUserNestedInput
    accounts?: AccountUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    debtors?: DebtorUncheckedUpdateManyWithoutUserNestedInput
    accounts?: AccountUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateManyInput = {
    id?: string
    name: string
    email: string
    password: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DebtorCreateInput = {
    id?: string
    name: string
    email?: string | null
    phone?: string | null
    user: UserCreateNestedOneWithoutDebtorsInput
    debts?: DebitCreateNestedManyWithoutDebtorInput
  }

  export type DebtorUncheckedCreateInput = {
    id?: string
    name: string
    email?: string | null
    phone?: string | null
    userId: string
    debts?: DebitUncheckedCreateNestedManyWithoutDebtorInput
  }

  export type DebtorUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    user?: UserUpdateOneRequiredWithoutDebtorsNestedInput
    debts?: DebitUpdateManyWithoutDebtorNestedInput
  }

  export type DebtorUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    userId?: StringFieldUpdateOperationsInput | string
    debts?: DebitUncheckedUpdateManyWithoutDebtorNestedInput
  }

  export type DebtorCreateManyInput = {
    id?: string
    name: string
    email?: string | null
    phone?: string | null
    userId: string
  }

  export type DebtorUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type DebtorUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    userId?: StringFieldUpdateOperationsInput | string
  }

  export type DebitCreateInput = {
    id?: string
    description: string
    totalAmount: Decimal | DecimalJsLike | number | string
    installmentQty: number
    startDate: Date | string
    dueDay: number
    status?: $Enums.DebitStatus
    createdAt?: Date | string
    updatedAt?: Date | string
    debtor: DebtorCreateNestedOneWithoutDebtsInput
    account: AccountCreateNestedOneWithoutDebtsInput
    installments?: InstallmentCreateNestedManyWithoutDebitInput
  }

  export type DebitUncheckedCreateInput = {
    id?: string
    description: string
    totalAmount: Decimal | DecimalJsLike | number | string
    installmentQty: number
    startDate: Date | string
    dueDay: number
    status?: $Enums.DebitStatus
    debtorId: string
    accountId: string
    createdAt?: Date | string
    updatedAt?: Date | string
    installments?: InstallmentUncheckedCreateNestedManyWithoutDebitInput
  }

  export type DebitUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    totalAmount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    installmentQty?: IntFieldUpdateOperationsInput | number
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    dueDay?: IntFieldUpdateOperationsInput | number
    status?: EnumDebitStatusFieldUpdateOperationsInput | $Enums.DebitStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    debtor?: DebtorUpdateOneRequiredWithoutDebtsNestedInput
    account?: AccountUpdateOneRequiredWithoutDebtsNestedInput
    installments?: InstallmentUpdateManyWithoutDebitNestedInput
  }

  export type DebitUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    totalAmount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    installmentQty?: IntFieldUpdateOperationsInput | number
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    dueDay?: IntFieldUpdateOperationsInput | number
    status?: EnumDebitStatusFieldUpdateOperationsInput | $Enums.DebitStatus
    debtorId?: StringFieldUpdateOperationsInput | string
    accountId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    installments?: InstallmentUncheckedUpdateManyWithoutDebitNestedInput
  }

  export type DebitCreateManyInput = {
    id?: string
    description: string
    totalAmount: Decimal | DecimalJsLike | number | string
    installmentQty: number
    startDate: Date | string
    dueDay: number
    status?: $Enums.DebitStatus
    debtorId: string
    accountId: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type DebitUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    totalAmount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    installmentQty?: IntFieldUpdateOperationsInput | number
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    dueDay?: IntFieldUpdateOperationsInput | number
    status?: EnumDebitStatusFieldUpdateOperationsInput | $Enums.DebitStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DebitUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    totalAmount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    installmentQty?: IntFieldUpdateOperationsInput | number
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    dueDay?: IntFieldUpdateOperationsInput | number
    status?: EnumDebitStatusFieldUpdateOperationsInput | $Enums.DebitStatus
    debtorId?: StringFieldUpdateOperationsInput | string
    accountId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type InstallmentCreateInput = {
    id?: string
    amount: Decimal | DecimalJsLike | number | string
    dueDate: Date | string
    paidDate?: Date | string | null
    status?: $Enums.InstallmentStatus
    payments?: PaymentCreateNestedManyWithoutInstallmentInput
    debit: DebitCreateNestedOneWithoutInstallmentsInput
  }

  export type InstallmentUncheckedCreateInput = {
    id?: string
    amount: Decimal | DecimalJsLike | number | string
    dueDate: Date | string
    paidDate?: Date | string | null
    status?: $Enums.InstallmentStatus
    debitId: string
    payments?: PaymentUncheckedCreateNestedManyWithoutInstallmentInput
  }

  export type InstallmentUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    dueDate?: DateTimeFieldUpdateOperationsInput | Date | string
    paidDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: EnumInstallmentStatusFieldUpdateOperationsInput | $Enums.InstallmentStatus
    payments?: PaymentUpdateManyWithoutInstallmentNestedInput
    debit?: DebitUpdateOneRequiredWithoutInstallmentsNestedInput
  }

  export type InstallmentUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    dueDate?: DateTimeFieldUpdateOperationsInput | Date | string
    paidDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: EnumInstallmentStatusFieldUpdateOperationsInput | $Enums.InstallmentStatus
    debitId?: StringFieldUpdateOperationsInput | string
    payments?: PaymentUncheckedUpdateManyWithoutInstallmentNestedInput
  }

  export type InstallmentCreateManyInput = {
    id?: string
    amount: Decimal | DecimalJsLike | number | string
    dueDate: Date | string
    paidDate?: Date | string | null
    status?: $Enums.InstallmentStatus
    debitId: string
  }

  export type InstallmentUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    dueDate?: DateTimeFieldUpdateOperationsInput | Date | string
    paidDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: EnumInstallmentStatusFieldUpdateOperationsInput | $Enums.InstallmentStatus
  }

  export type InstallmentUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    dueDate?: DateTimeFieldUpdateOperationsInput | Date | string
    paidDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: EnumInstallmentStatusFieldUpdateOperationsInput | $Enums.InstallmentStatus
    debitId?: StringFieldUpdateOperationsInput | string
  }

  export type PaymentCreateInput = {
    id?: string
    amount: Decimal | DecimalJsLike | number | string
    paymentDate: Date | string
    installment: InstallmentCreateNestedOneWithoutPaymentsInput
  }

  export type PaymentUncheckedCreateInput = {
    id?: string
    amount: Decimal | DecimalJsLike | number | string
    paymentDate: Date | string
    installmentId: string
  }

  export type PaymentUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    paymentDate?: DateTimeFieldUpdateOperationsInput | Date | string
    installment?: InstallmentUpdateOneRequiredWithoutPaymentsNestedInput
  }

  export type PaymentUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    paymentDate?: DateTimeFieldUpdateOperationsInput | Date | string
    installmentId?: StringFieldUpdateOperationsInput | string
  }

  export type PaymentCreateManyInput = {
    id?: string
    amount: Decimal | DecimalJsLike | number | string
    paymentDate: Date | string
    installmentId: string
  }

  export type PaymentUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    paymentDate?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PaymentUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    paymentDate?: DateTimeFieldUpdateOperationsInput | Date | string
    installmentId?: StringFieldUpdateOperationsInput | string
  }

  export type AccountCreateInput = {
    id?: string
    name: string
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutAccountsInput
    debts?: DebitCreateNestedManyWithoutAccountInput
  }

  export type AccountUncheckedCreateInput = {
    id?: string
    name: string
    createdAt?: Date | string
    updatedAt?: Date | string
    userId: string
    debts?: DebitUncheckedCreateNestedManyWithoutAccountInput
  }

  export type AccountUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutAccountsNestedInput
    debts?: DebitUpdateManyWithoutAccountNestedInput
  }

  export type AccountUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userId?: StringFieldUpdateOperationsInput | string
    debts?: DebitUncheckedUpdateManyWithoutAccountNestedInput
  }

  export type AccountCreateManyInput = {
    id?: string
    name: string
    createdAt?: Date | string
    updatedAt?: Date | string
    userId: string
  }

  export type AccountUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AccountUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userId?: StringFieldUpdateOperationsInput | string
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type DebtorListRelationFilter = {
    every?: DebtorWhereInput
    some?: DebtorWhereInput
    none?: DebtorWhereInput
  }

  export type AccountListRelationFilter = {
    every?: AccountWhereInput
    some?: AccountWhereInput
    none?: AccountWhereInput
  }

  export type DebtorOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type AccountOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    password?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    password?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    password?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type UserRelationFilter = {
    is?: UserWhereInput
    isNot?: UserWhereInput
  }

  export type DebitListRelationFilter = {
    every?: DebitWhereInput
    some?: DebitWhereInput
    none?: DebitWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type DebitOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type DebtorCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    phone?: SortOrder
    userId?: SortOrder
  }

  export type DebtorMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    phone?: SortOrder
    userId?: SortOrder
  }

  export type DebtorMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    phone?: SortOrder
    userId?: SortOrder
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type DecimalFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type EnumDebitStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.DebitStatus | EnumDebitStatusFieldRefInput<$PrismaModel>
    in?: $Enums.DebitStatus[] | ListEnumDebitStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.DebitStatus[] | ListEnumDebitStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumDebitStatusFilter<$PrismaModel> | $Enums.DebitStatus
  }

  export type DebtorRelationFilter = {
    is?: DebtorWhereInput
    isNot?: DebtorWhereInput
  }

  export type AccountRelationFilter = {
    is?: AccountWhereInput
    isNot?: AccountWhereInput
  }

  export type InstallmentListRelationFilter = {
    every?: InstallmentWhereInput
    some?: InstallmentWhereInput
    none?: InstallmentWhereInput
  }

  export type InstallmentOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type DebitCountOrderByAggregateInput = {
    id?: SortOrder
    description?: SortOrder
    totalAmount?: SortOrder
    installmentQty?: SortOrder
    startDate?: SortOrder
    dueDay?: SortOrder
    status?: SortOrder
    debtorId?: SortOrder
    accountId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type DebitAvgOrderByAggregateInput = {
    totalAmount?: SortOrder
    installmentQty?: SortOrder
    dueDay?: SortOrder
  }

  export type DebitMaxOrderByAggregateInput = {
    id?: SortOrder
    description?: SortOrder
    totalAmount?: SortOrder
    installmentQty?: SortOrder
    startDate?: SortOrder
    dueDay?: SortOrder
    status?: SortOrder
    debtorId?: SortOrder
    accountId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type DebitMinOrderByAggregateInput = {
    id?: SortOrder
    description?: SortOrder
    totalAmount?: SortOrder
    installmentQty?: SortOrder
    startDate?: SortOrder
    dueDay?: SortOrder
    status?: SortOrder
    debtorId?: SortOrder
    accountId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type DebitSumOrderByAggregateInput = {
    totalAmount?: SortOrder
    installmentQty?: SortOrder
    dueDay?: SortOrder
  }

  export type DecimalWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalWithAggregatesFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedDecimalFilter<$PrismaModel>
    _sum?: NestedDecimalFilter<$PrismaModel>
    _min?: NestedDecimalFilter<$PrismaModel>
    _max?: NestedDecimalFilter<$PrismaModel>
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type EnumDebitStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.DebitStatus | EnumDebitStatusFieldRefInput<$PrismaModel>
    in?: $Enums.DebitStatus[] | ListEnumDebitStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.DebitStatus[] | ListEnumDebitStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumDebitStatusWithAggregatesFilter<$PrismaModel> | $Enums.DebitStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumDebitStatusFilter<$PrismaModel>
    _max?: NestedEnumDebitStatusFilter<$PrismaModel>
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type EnumInstallmentStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.InstallmentStatus | EnumInstallmentStatusFieldRefInput<$PrismaModel>
    in?: $Enums.InstallmentStatus[] | ListEnumInstallmentStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.InstallmentStatus[] | ListEnumInstallmentStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumInstallmentStatusFilter<$PrismaModel> | $Enums.InstallmentStatus
  }

  export type PaymentListRelationFilter = {
    every?: PaymentWhereInput
    some?: PaymentWhereInput
    none?: PaymentWhereInput
  }

  export type DebitRelationFilter = {
    is?: DebitWhereInput
    isNot?: DebitWhereInput
  }

  export type PaymentOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type InstallmentCountOrderByAggregateInput = {
    id?: SortOrder
    amount?: SortOrder
    dueDate?: SortOrder
    paidDate?: SortOrder
    status?: SortOrder
    debitId?: SortOrder
  }

  export type InstallmentAvgOrderByAggregateInput = {
    amount?: SortOrder
  }

  export type InstallmentMaxOrderByAggregateInput = {
    id?: SortOrder
    amount?: SortOrder
    dueDate?: SortOrder
    paidDate?: SortOrder
    status?: SortOrder
    debitId?: SortOrder
  }

  export type InstallmentMinOrderByAggregateInput = {
    id?: SortOrder
    amount?: SortOrder
    dueDate?: SortOrder
    paidDate?: SortOrder
    status?: SortOrder
    debitId?: SortOrder
  }

  export type InstallmentSumOrderByAggregateInput = {
    amount?: SortOrder
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type EnumInstallmentStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.InstallmentStatus | EnumInstallmentStatusFieldRefInput<$PrismaModel>
    in?: $Enums.InstallmentStatus[] | ListEnumInstallmentStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.InstallmentStatus[] | ListEnumInstallmentStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumInstallmentStatusWithAggregatesFilter<$PrismaModel> | $Enums.InstallmentStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumInstallmentStatusFilter<$PrismaModel>
    _max?: NestedEnumInstallmentStatusFilter<$PrismaModel>
  }

  export type InstallmentRelationFilter = {
    is?: InstallmentWhereInput
    isNot?: InstallmentWhereInput
  }

  export type PaymentCountOrderByAggregateInput = {
    id?: SortOrder
    amount?: SortOrder
    paymentDate?: SortOrder
    installmentId?: SortOrder
  }

  export type PaymentAvgOrderByAggregateInput = {
    amount?: SortOrder
  }

  export type PaymentMaxOrderByAggregateInput = {
    id?: SortOrder
    amount?: SortOrder
    paymentDate?: SortOrder
    installmentId?: SortOrder
  }

  export type PaymentMinOrderByAggregateInput = {
    id?: SortOrder
    amount?: SortOrder
    paymentDate?: SortOrder
    installmentId?: SortOrder
  }

  export type PaymentSumOrderByAggregateInput = {
    amount?: SortOrder
  }

  export type AccountCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    userId?: SortOrder
  }

  export type AccountMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    userId?: SortOrder
  }

  export type AccountMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    userId?: SortOrder
  }

  export type DebtorCreateNestedManyWithoutUserInput = {
    create?: XOR<DebtorCreateWithoutUserInput, DebtorUncheckedCreateWithoutUserInput> | DebtorCreateWithoutUserInput[] | DebtorUncheckedCreateWithoutUserInput[]
    connectOrCreate?: DebtorCreateOrConnectWithoutUserInput | DebtorCreateOrConnectWithoutUserInput[]
    createMany?: DebtorCreateManyUserInputEnvelope
    connect?: DebtorWhereUniqueInput | DebtorWhereUniqueInput[]
  }

  export type AccountCreateNestedManyWithoutUserInput = {
    create?: XOR<AccountCreateWithoutUserInput, AccountUncheckedCreateWithoutUserInput> | AccountCreateWithoutUserInput[] | AccountUncheckedCreateWithoutUserInput[]
    connectOrCreate?: AccountCreateOrConnectWithoutUserInput | AccountCreateOrConnectWithoutUserInput[]
    createMany?: AccountCreateManyUserInputEnvelope
    connect?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
  }

  export type DebtorUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<DebtorCreateWithoutUserInput, DebtorUncheckedCreateWithoutUserInput> | DebtorCreateWithoutUserInput[] | DebtorUncheckedCreateWithoutUserInput[]
    connectOrCreate?: DebtorCreateOrConnectWithoutUserInput | DebtorCreateOrConnectWithoutUserInput[]
    createMany?: DebtorCreateManyUserInputEnvelope
    connect?: DebtorWhereUniqueInput | DebtorWhereUniqueInput[]
  }

  export type AccountUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<AccountCreateWithoutUserInput, AccountUncheckedCreateWithoutUserInput> | AccountCreateWithoutUserInput[] | AccountUncheckedCreateWithoutUserInput[]
    connectOrCreate?: AccountCreateOrConnectWithoutUserInput | AccountCreateOrConnectWithoutUserInput[]
    createMany?: AccountCreateManyUserInputEnvelope
    connect?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type DebtorUpdateManyWithoutUserNestedInput = {
    create?: XOR<DebtorCreateWithoutUserInput, DebtorUncheckedCreateWithoutUserInput> | DebtorCreateWithoutUserInput[] | DebtorUncheckedCreateWithoutUserInput[]
    connectOrCreate?: DebtorCreateOrConnectWithoutUserInput | DebtorCreateOrConnectWithoutUserInput[]
    upsert?: DebtorUpsertWithWhereUniqueWithoutUserInput | DebtorUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: DebtorCreateManyUserInputEnvelope
    set?: DebtorWhereUniqueInput | DebtorWhereUniqueInput[]
    disconnect?: DebtorWhereUniqueInput | DebtorWhereUniqueInput[]
    delete?: DebtorWhereUniqueInput | DebtorWhereUniqueInput[]
    connect?: DebtorWhereUniqueInput | DebtorWhereUniqueInput[]
    update?: DebtorUpdateWithWhereUniqueWithoutUserInput | DebtorUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: DebtorUpdateManyWithWhereWithoutUserInput | DebtorUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: DebtorScalarWhereInput | DebtorScalarWhereInput[]
  }

  export type AccountUpdateManyWithoutUserNestedInput = {
    create?: XOR<AccountCreateWithoutUserInput, AccountUncheckedCreateWithoutUserInput> | AccountCreateWithoutUserInput[] | AccountUncheckedCreateWithoutUserInput[]
    connectOrCreate?: AccountCreateOrConnectWithoutUserInput | AccountCreateOrConnectWithoutUserInput[]
    upsert?: AccountUpsertWithWhereUniqueWithoutUserInput | AccountUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: AccountCreateManyUserInputEnvelope
    set?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
    disconnect?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
    delete?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
    connect?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
    update?: AccountUpdateWithWhereUniqueWithoutUserInput | AccountUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: AccountUpdateManyWithWhereWithoutUserInput | AccountUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: AccountScalarWhereInput | AccountScalarWhereInput[]
  }

  export type DebtorUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<DebtorCreateWithoutUserInput, DebtorUncheckedCreateWithoutUserInput> | DebtorCreateWithoutUserInput[] | DebtorUncheckedCreateWithoutUserInput[]
    connectOrCreate?: DebtorCreateOrConnectWithoutUserInput | DebtorCreateOrConnectWithoutUserInput[]
    upsert?: DebtorUpsertWithWhereUniqueWithoutUserInput | DebtorUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: DebtorCreateManyUserInputEnvelope
    set?: DebtorWhereUniqueInput | DebtorWhereUniqueInput[]
    disconnect?: DebtorWhereUniqueInput | DebtorWhereUniqueInput[]
    delete?: DebtorWhereUniqueInput | DebtorWhereUniqueInput[]
    connect?: DebtorWhereUniqueInput | DebtorWhereUniqueInput[]
    update?: DebtorUpdateWithWhereUniqueWithoutUserInput | DebtorUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: DebtorUpdateManyWithWhereWithoutUserInput | DebtorUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: DebtorScalarWhereInput | DebtorScalarWhereInput[]
  }

  export type AccountUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<AccountCreateWithoutUserInput, AccountUncheckedCreateWithoutUserInput> | AccountCreateWithoutUserInput[] | AccountUncheckedCreateWithoutUserInput[]
    connectOrCreate?: AccountCreateOrConnectWithoutUserInput | AccountCreateOrConnectWithoutUserInput[]
    upsert?: AccountUpsertWithWhereUniqueWithoutUserInput | AccountUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: AccountCreateManyUserInputEnvelope
    set?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
    disconnect?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
    delete?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
    connect?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
    update?: AccountUpdateWithWhereUniqueWithoutUserInput | AccountUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: AccountUpdateManyWithWhereWithoutUserInput | AccountUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: AccountScalarWhereInput | AccountScalarWhereInput[]
  }

  export type UserCreateNestedOneWithoutDebtorsInput = {
    create?: XOR<UserCreateWithoutDebtorsInput, UserUncheckedCreateWithoutDebtorsInput>
    connectOrCreate?: UserCreateOrConnectWithoutDebtorsInput
    connect?: UserWhereUniqueInput
  }

  export type DebitCreateNestedManyWithoutDebtorInput = {
    create?: XOR<DebitCreateWithoutDebtorInput, DebitUncheckedCreateWithoutDebtorInput> | DebitCreateWithoutDebtorInput[] | DebitUncheckedCreateWithoutDebtorInput[]
    connectOrCreate?: DebitCreateOrConnectWithoutDebtorInput | DebitCreateOrConnectWithoutDebtorInput[]
    createMany?: DebitCreateManyDebtorInputEnvelope
    connect?: DebitWhereUniqueInput | DebitWhereUniqueInput[]
  }

  export type DebitUncheckedCreateNestedManyWithoutDebtorInput = {
    create?: XOR<DebitCreateWithoutDebtorInput, DebitUncheckedCreateWithoutDebtorInput> | DebitCreateWithoutDebtorInput[] | DebitUncheckedCreateWithoutDebtorInput[]
    connectOrCreate?: DebitCreateOrConnectWithoutDebtorInput | DebitCreateOrConnectWithoutDebtorInput[]
    createMany?: DebitCreateManyDebtorInputEnvelope
    connect?: DebitWhereUniqueInput | DebitWhereUniqueInput[]
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type UserUpdateOneRequiredWithoutDebtorsNestedInput = {
    create?: XOR<UserCreateWithoutDebtorsInput, UserUncheckedCreateWithoutDebtorsInput>
    connectOrCreate?: UserCreateOrConnectWithoutDebtorsInput
    upsert?: UserUpsertWithoutDebtorsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutDebtorsInput, UserUpdateWithoutDebtorsInput>, UserUncheckedUpdateWithoutDebtorsInput>
  }

  export type DebitUpdateManyWithoutDebtorNestedInput = {
    create?: XOR<DebitCreateWithoutDebtorInput, DebitUncheckedCreateWithoutDebtorInput> | DebitCreateWithoutDebtorInput[] | DebitUncheckedCreateWithoutDebtorInput[]
    connectOrCreate?: DebitCreateOrConnectWithoutDebtorInput | DebitCreateOrConnectWithoutDebtorInput[]
    upsert?: DebitUpsertWithWhereUniqueWithoutDebtorInput | DebitUpsertWithWhereUniqueWithoutDebtorInput[]
    createMany?: DebitCreateManyDebtorInputEnvelope
    set?: DebitWhereUniqueInput | DebitWhereUniqueInput[]
    disconnect?: DebitWhereUniqueInput | DebitWhereUniqueInput[]
    delete?: DebitWhereUniqueInput | DebitWhereUniqueInput[]
    connect?: DebitWhereUniqueInput | DebitWhereUniqueInput[]
    update?: DebitUpdateWithWhereUniqueWithoutDebtorInput | DebitUpdateWithWhereUniqueWithoutDebtorInput[]
    updateMany?: DebitUpdateManyWithWhereWithoutDebtorInput | DebitUpdateManyWithWhereWithoutDebtorInput[]
    deleteMany?: DebitScalarWhereInput | DebitScalarWhereInput[]
  }

  export type DebitUncheckedUpdateManyWithoutDebtorNestedInput = {
    create?: XOR<DebitCreateWithoutDebtorInput, DebitUncheckedCreateWithoutDebtorInput> | DebitCreateWithoutDebtorInput[] | DebitUncheckedCreateWithoutDebtorInput[]
    connectOrCreate?: DebitCreateOrConnectWithoutDebtorInput | DebitCreateOrConnectWithoutDebtorInput[]
    upsert?: DebitUpsertWithWhereUniqueWithoutDebtorInput | DebitUpsertWithWhereUniqueWithoutDebtorInput[]
    createMany?: DebitCreateManyDebtorInputEnvelope
    set?: DebitWhereUniqueInput | DebitWhereUniqueInput[]
    disconnect?: DebitWhereUniqueInput | DebitWhereUniqueInput[]
    delete?: DebitWhereUniqueInput | DebitWhereUniqueInput[]
    connect?: DebitWhereUniqueInput | DebitWhereUniqueInput[]
    update?: DebitUpdateWithWhereUniqueWithoutDebtorInput | DebitUpdateWithWhereUniqueWithoutDebtorInput[]
    updateMany?: DebitUpdateManyWithWhereWithoutDebtorInput | DebitUpdateManyWithWhereWithoutDebtorInput[]
    deleteMany?: DebitScalarWhereInput | DebitScalarWhereInput[]
  }

  export type DebtorCreateNestedOneWithoutDebtsInput = {
    create?: XOR<DebtorCreateWithoutDebtsInput, DebtorUncheckedCreateWithoutDebtsInput>
    connectOrCreate?: DebtorCreateOrConnectWithoutDebtsInput
    connect?: DebtorWhereUniqueInput
  }

  export type AccountCreateNestedOneWithoutDebtsInput = {
    create?: XOR<AccountCreateWithoutDebtsInput, AccountUncheckedCreateWithoutDebtsInput>
    connectOrCreate?: AccountCreateOrConnectWithoutDebtsInput
    connect?: AccountWhereUniqueInput
  }

  export type InstallmentCreateNestedManyWithoutDebitInput = {
    create?: XOR<InstallmentCreateWithoutDebitInput, InstallmentUncheckedCreateWithoutDebitInput> | InstallmentCreateWithoutDebitInput[] | InstallmentUncheckedCreateWithoutDebitInput[]
    connectOrCreate?: InstallmentCreateOrConnectWithoutDebitInput | InstallmentCreateOrConnectWithoutDebitInput[]
    createMany?: InstallmentCreateManyDebitInputEnvelope
    connect?: InstallmentWhereUniqueInput | InstallmentWhereUniqueInput[]
  }

  export type InstallmentUncheckedCreateNestedManyWithoutDebitInput = {
    create?: XOR<InstallmentCreateWithoutDebitInput, InstallmentUncheckedCreateWithoutDebitInput> | InstallmentCreateWithoutDebitInput[] | InstallmentUncheckedCreateWithoutDebitInput[]
    connectOrCreate?: InstallmentCreateOrConnectWithoutDebitInput | InstallmentCreateOrConnectWithoutDebitInput[]
    createMany?: InstallmentCreateManyDebitInputEnvelope
    connect?: InstallmentWhereUniqueInput | InstallmentWhereUniqueInput[]
  }

  export type DecimalFieldUpdateOperationsInput = {
    set?: Decimal | DecimalJsLike | number | string
    increment?: Decimal | DecimalJsLike | number | string
    decrement?: Decimal | DecimalJsLike | number | string
    multiply?: Decimal | DecimalJsLike | number | string
    divide?: Decimal | DecimalJsLike | number | string
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type EnumDebitStatusFieldUpdateOperationsInput = {
    set?: $Enums.DebitStatus
  }

  export type DebtorUpdateOneRequiredWithoutDebtsNestedInput = {
    create?: XOR<DebtorCreateWithoutDebtsInput, DebtorUncheckedCreateWithoutDebtsInput>
    connectOrCreate?: DebtorCreateOrConnectWithoutDebtsInput
    upsert?: DebtorUpsertWithoutDebtsInput
    connect?: DebtorWhereUniqueInput
    update?: XOR<XOR<DebtorUpdateToOneWithWhereWithoutDebtsInput, DebtorUpdateWithoutDebtsInput>, DebtorUncheckedUpdateWithoutDebtsInput>
  }

  export type AccountUpdateOneRequiredWithoutDebtsNestedInput = {
    create?: XOR<AccountCreateWithoutDebtsInput, AccountUncheckedCreateWithoutDebtsInput>
    connectOrCreate?: AccountCreateOrConnectWithoutDebtsInput
    upsert?: AccountUpsertWithoutDebtsInput
    connect?: AccountWhereUniqueInput
    update?: XOR<XOR<AccountUpdateToOneWithWhereWithoutDebtsInput, AccountUpdateWithoutDebtsInput>, AccountUncheckedUpdateWithoutDebtsInput>
  }

  export type InstallmentUpdateManyWithoutDebitNestedInput = {
    create?: XOR<InstallmentCreateWithoutDebitInput, InstallmentUncheckedCreateWithoutDebitInput> | InstallmentCreateWithoutDebitInput[] | InstallmentUncheckedCreateWithoutDebitInput[]
    connectOrCreate?: InstallmentCreateOrConnectWithoutDebitInput | InstallmentCreateOrConnectWithoutDebitInput[]
    upsert?: InstallmentUpsertWithWhereUniqueWithoutDebitInput | InstallmentUpsertWithWhereUniqueWithoutDebitInput[]
    createMany?: InstallmentCreateManyDebitInputEnvelope
    set?: InstallmentWhereUniqueInput | InstallmentWhereUniqueInput[]
    disconnect?: InstallmentWhereUniqueInput | InstallmentWhereUniqueInput[]
    delete?: InstallmentWhereUniqueInput | InstallmentWhereUniqueInput[]
    connect?: InstallmentWhereUniqueInput | InstallmentWhereUniqueInput[]
    update?: InstallmentUpdateWithWhereUniqueWithoutDebitInput | InstallmentUpdateWithWhereUniqueWithoutDebitInput[]
    updateMany?: InstallmentUpdateManyWithWhereWithoutDebitInput | InstallmentUpdateManyWithWhereWithoutDebitInput[]
    deleteMany?: InstallmentScalarWhereInput | InstallmentScalarWhereInput[]
  }

  export type InstallmentUncheckedUpdateManyWithoutDebitNestedInput = {
    create?: XOR<InstallmentCreateWithoutDebitInput, InstallmentUncheckedCreateWithoutDebitInput> | InstallmentCreateWithoutDebitInput[] | InstallmentUncheckedCreateWithoutDebitInput[]
    connectOrCreate?: InstallmentCreateOrConnectWithoutDebitInput | InstallmentCreateOrConnectWithoutDebitInput[]
    upsert?: InstallmentUpsertWithWhereUniqueWithoutDebitInput | InstallmentUpsertWithWhereUniqueWithoutDebitInput[]
    createMany?: InstallmentCreateManyDebitInputEnvelope
    set?: InstallmentWhereUniqueInput | InstallmentWhereUniqueInput[]
    disconnect?: InstallmentWhereUniqueInput | InstallmentWhereUniqueInput[]
    delete?: InstallmentWhereUniqueInput | InstallmentWhereUniqueInput[]
    connect?: InstallmentWhereUniqueInput | InstallmentWhereUniqueInput[]
    update?: InstallmentUpdateWithWhereUniqueWithoutDebitInput | InstallmentUpdateWithWhereUniqueWithoutDebitInput[]
    updateMany?: InstallmentUpdateManyWithWhereWithoutDebitInput | InstallmentUpdateManyWithWhereWithoutDebitInput[]
    deleteMany?: InstallmentScalarWhereInput | InstallmentScalarWhereInput[]
  }

  export type PaymentCreateNestedManyWithoutInstallmentInput = {
    create?: XOR<PaymentCreateWithoutInstallmentInput, PaymentUncheckedCreateWithoutInstallmentInput> | PaymentCreateWithoutInstallmentInput[] | PaymentUncheckedCreateWithoutInstallmentInput[]
    connectOrCreate?: PaymentCreateOrConnectWithoutInstallmentInput | PaymentCreateOrConnectWithoutInstallmentInput[]
    createMany?: PaymentCreateManyInstallmentInputEnvelope
    connect?: PaymentWhereUniqueInput | PaymentWhereUniqueInput[]
  }

  export type DebitCreateNestedOneWithoutInstallmentsInput = {
    create?: XOR<DebitCreateWithoutInstallmentsInput, DebitUncheckedCreateWithoutInstallmentsInput>
    connectOrCreate?: DebitCreateOrConnectWithoutInstallmentsInput
    connect?: DebitWhereUniqueInput
  }

  export type PaymentUncheckedCreateNestedManyWithoutInstallmentInput = {
    create?: XOR<PaymentCreateWithoutInstallmentInput, PaymentUncheckedCreateWithoutInstallmentInput> | PaymentCreateWithoutInstallmentInput[] | PaymentUncheckedCreateWithoutInstallmentInput[]
    connectOrCreate?: PaymentCreateOrConnectWithoutInstallmentInput | PaymentCreateOrConnectWithoutInstallmentInput[]
    createMany?: PaymentCreateManyInstallmentInputEnvelope
    connect?: PaymentWhereUniqueInput | PaymentWhereUniqueInput[]
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type EnumInstallmentStatusFieldUpdateOperationsInput = {
    set?: $Enums.InstallmentStatus
  }

  export type PaymentUpdateManyWithoutInstallmentNestedInput = {
    create?: XOR<PaymentCreateWithoutInstallmentInput, PaymentUncheckedCreateWithoutInstallmentInput> | PaymentCreateWithoutInstallmentInput[] | PaymentUncheckedCreateWithoutInstallmentInput[]
    connectOrCreate?: PaymentCreateOrConnectWithoutInstallmentInput | PaymentCreateOrConnectWithoutInstallmentInput[]
    upsert?: PaymentUpsertWithWhereUniqueWithoutInstallmentInput | PaymentUpsertWithWhereUniqueWithoutInstallmentInput[]
    createMany?: PaymentCreateManyInstallmentInputEnvelope
    set?: PaymentWhereUniqueInput | PaymentWhereUniqueInput[]
    disconnect?: PaymentWhereUniqueInput | PaymentWhereUniqueInput[]
    delete?: PaymentWhereUniqueInput | PaymentWhereUniqueInput[]
    connect?: PaymentWhereUniqueInput | PaymentWhereUniqueInput[]
    update?: PaymentUpdateWithWhereUniqueWithoutInstallmentInput | PaymentUpdateWithWhereUniqueWithoutInstallmentInput[]
    updateMany?: PaymentUpdateManyWithWhereWithoutInstallmentInput | PaymentUpdateManyWithWhereWithoutInstallmentInput[]
    deleteMany?: PaymentScalarWhereInput | PaymentScalarWhereInput[]
  }

  export type DebitUpdateOneRequiredWithoutInstallmentsNestedInput = {
    create?: XOR<DebitCreateWithoutInstallmentsInput, DebitUncheckedCreateWithoutInstallmentsInput>
    connectOrCreate?: DebitCreateOrConnectWithoutInstallmentsInput
    upsert?: DebitUpsertWithoutInstallmentsInput
    connect?: DebitWhereUniqueInput
    update?: XOR<XOR<DebitUpdateToOneWithWhereWithoutInstallmentsInput, DebitUpdateWithoutInstallmentsInput>, DebitUncheckedUpdateWithoutInstallmentsInput>
  }

  export type PaymentUncheckedUpdateManyWithoutInstallmentNestedInput = {
    create?: XOR<PaymentCreateWithoutInstallmentInput, PaymentUncheckedCreateWithoutInstallmentInput> | PaymentCreateWithoutInstallmentInput[] | PaymentUncheckedCreateWithoutInstallmentInput[]
    connectOrCreate?: PaymentCreateOrConnectWithoutInstallmentInput | PaymentCreateOrConnectWithoutInstallmentInput[]
    upsert?: PaymentUpsertWithWhereUniqueWithoutInstallmentInput | PaymentUpsertWithWhereUniqueWithoutInstallmentInput[]
    createMany?: PaymentCreateManyInstallmentInputEnvelope
    set?: PaymentWhereUniqueInput | PaymentWhereUniqueInput[]
    disconnect?: PaymentWhereUniqueInput | PaymentWhereUniqueInput[]
    delete?: PaymentWhereUniqueInput | PaymentWhereUniqueInput[]
    connect?: PaymentWhereUniqueInput | PaymentWhereUniqueInput[]
    update?: PaymentUpdateWithWhereUniqueWithoutInstallmentInput | PaymentUpdateWithWhereUniqueWithoutInstallmentInput[]
    updateMany?: PaymentUpdateManyWithWhereWithoutInstallmentInput | PaymentUpdateManyWithWhereWithoutInstallmentInput[]
    deleteMany?: PaymentScalarWhereInput | PaymentScalarWhereInput[]
  }

  export type InstallmentCreateNestedOneWithoutPaymentsInput = {
    create?: XOR<InstallmentCreateWithoutPaymentsInput, InstallmentUncheckedCreateWithoutPaymentsInput>
    connectOrCreate?: InstallmentCreateOrConnectWithoutPaymentsInput
    connect?: InstallmentWhereUniqueInput
  }

  export type InstallmentUpdateOneRequiredWithoutPaymentsNestedInput = {
    create?: XOR<InstallmentCreateWithoutPaymentsInput, InstallmentUncheckedCreateWithoutPaymentsInput>
    connectOrCreate?: InstallmentCreateOrConnectWithoutPaymentsInput
    upsert?: InstallmentUpsertWithoutPaymentsInput
    connect?: InstallmentWhereUniqueInput
    update?: XOR<XOR<InstallmentUpdateToOneWithWhereWithoutPaymentsInput, InstallmentUpdateWithoutPaymentsInput>, InstallmentUncheckedUpdateWithoutPaymentsInput>
  }

  export type UserCreateNestedOneWithoutAccountsInput = {
    create?: XOR<UserCreateWithoutAccountsInput, UserUncheckedCreateWithoutAccountsInput>
    connectOrCreate?: UserCreateOrConnectWithoutAccountsInput
    connect?: UserWhereUniqueInput
  }

  export type DebitCreateNestedManyWithoutAccountInput = {
    create?: XOR<DebitCreateWithoutAccountInput, DebitUncheckedCreateWithoutAccountInput> | DebitCreateWithoutAccountInput[] | DebitUncheckedCreateWithoutAccountInput[]
    connectOrCreate?: DebitCreateOrConnectWithoutAccountInput | DebitCreateOrConnectWithoutAccountInput[]
    createMany?: DebitCreateManyAccountInputEnvelope
    connect?: DebitWhereUniqueInput | DebitWhereUniqueInput[]
  }

  export type DebitUncheckedCreateNestedManyWithoutAccountInput = {
    create?: XOR<DebitCreateWithoutAccountInput, DebitUncheckedCreateWithoutAccountInput> | DebitCreateWithoutAccountInput[] | DebitUncheckedCreateWithoutAccountInput[]
    connectOrCreate?: DebitCreateOrConnectWithoutAccountInput | DebitCreateOrConnectWithoutAccountInput[]
    createMany?: DebitCreateManyAccountInputEnvelope
    connect?: DebitWhereUniqueInput | DebitWhereUniqueInput[]
  }

  export type UserUpdateOneRequiredWithoutAccountsNestedInput = {
    create?: XOR<UserCreateWithoutAccountsInput, UserUncheckedCreateWithoutAccountsInput>
    connectOrCreate?: UserCreateOrConnectWithoutAccountsInput
    upsert?: UserUpsertWithoutAccountsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutAccountsInput, UserUpdateWithoutAccountsInput>, UserUncheckedUpdateWithoutAccountsInput>
  }

  export type DebitUpdateManyWithoutAccountNestedInput = {
    create?: XOR<DebitCreateWithoutAccountInput, DebitUncheckedCreateWithoutAccountInput> | DebitCreateWithoutAccountInput[] | DebitUncheckedCreateWithoutAccountInput[]
    connectOrCreate?: DebitCreateOrConnectWithoutAccountInput | DebitCreateOrConnectWithoutAccountInput[]
    upsert?: DebitUpsertWithWhereUniqueWithoutAccountInput | DebitUpsertWithWhereUniqueWithoutAccountInput[]
    createMany?: DebitCreateManyAccountInputEnvelope
    set?: DebitWhereUniqueInput | DebitWhereUniqueInput[]
    disconnect?: DebitWhereUniqueInput | DebitWhereUniqueInput[]
    delete?: DebitWhereUniqueInput | DebitWhereUniqueInput[]
    connect?: DebitWhereUniqueInput | DebitWhereUniqueInput[]
    update?: DebitUpdateWithWhereUniqueWithoutAccountInput | DebitUpdateWithWhereUniqueWithoutAccountInput[]
    updateMany?: DebitUpdateManyWithWhereWithoutAccountInput | DebitUpdateManyWithWhereWithoutAccountInput[]
    deleteMany?: DebitScalarWhereInput | DebitScalarWhereInput[]
  }

  export type DebitUncheckedUpdateManyWithoutAccountNestedInput = {
    create?: XOR<DebitCreateWithoutAccountInput, DebitUncheckedCreateWithoutAccountInput> | DebitCreateWithoutAccountInput[] | DebitUncheckedCreateWithoutAccountInput[]
    connectOrCreate?: DebitCreateOrConnectWithoutAccountInput | DebitCreateOrConnectWithoutAccountInput[]
    upsert?: DebitUpsertWithWhereUniqueWithoutAccountInput | DebitUpsertWithWhereUniqueWithoutAccountInput[]
    createMany?: DebitCreateManyAccountInputEnvelope
    set?: DebitWhereUniqueInput | DebitWhereUniqueInput[]
    disconnect?: DebitWhereUniqueInput | DebitWhereUniqueInput[]
    delete?: DebitWhereUniqueInput | DebitWhereUniqueInput[]
    connect?: DebitWhereUniqueInput | DebitWhereUniqueInput[]
    update?: DebitUpdateWithWhereUniqueWithoutAccountInput | DebitUpdateWithWhereUniqueWithoutAccountInput[]
    updateMany?: DebitUpdateManyWithWhereWithoutAccountInput | DebitUpdateManyWithWhereWithoutAccountInput[]
    deleteMany?: DebitScalarWhereInput | DebitScalarWhereInput[]
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedDecimalFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string
  }

  export type NestedEnumDebitStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.DebitStatus | EnumDebitStatusFieldRefInput<$PrismaModel>
    in?: $Enums.DebitStatus[] | ListEnumDebitStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.DebitStatus[] | ListEnumDebitStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumDebitStatusFilter<$PrismaModel> | $Enums.DebitStatus
  }

  export type NestedDecimalWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalWithAggregatesFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedDecimalFilter<$PrismaModel>
    _sum?: NestedDecimalFilter<$PrismaModel>
    _min?: NestedDecimalFilter<$PrismaModel>
    _max?: NestedDecimalFilter<$PrismaModel>
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedEnumDebitStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.DebitStatus | EnumDebitStatusFieldRefInput<$PrismaModel>
    in?: $Enums.DebitStatus[] | ListEnumDebitStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.DebitStatus[] | ListEnumDebitStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumDebitStatusWithAggregatesFilter<$PrismaModel> | $Enums.DebitStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumDebitStatusFilter<$PrismaModel>
    _max?: NestedEnumDebitStatusFilter<$PrismaModel>
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedEnumInstallmentStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.InstallmentStatus | EnumInstallmentStatusFieldRefInput<$PrismaModel>
    in?: $Enums.InstallmentStatus[] | ListEnumInstallmentStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.InstallmentStatus[] | ListEnumInstallmentStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumInstallmentStatusFilter<$PrismaModel> | $Enums.InstallmentStatus
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type NestedEnumInstallmentStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.InstallmentStatus | EnumInstallmentStatusFieldRefInput<$PrismaModel>
    in?: $Enums.InstallmentStatus[] | ListEnumInstallmentStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.InstallmentStatus[] | ListEnumInstallmentStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumInstallmentStatusWithAggregatesFilter<$PrismaModel> | $Enums.InstallmentStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumInstallmentStatusFilter<$PrismaModel>
    _max?: NestedEnumInstallmentStatusFilter<$PrismaModel>
  }

  export type DebtorCreateWithoutUserInput = {
    id?: string
    name: string
    email?: string | null
    phone?: string | null
    debts?: DebitCreateNestedManyWithoutDebtorInput
  }

  export type DebtorUncheckedCreateWithoutUserInput = {
    id?: string
    name: string
    email?: string | null
    phone?: string | null
    debts?: DebitUncheckedCreateNestedManyWithoutDebtorInput
  }

  export type DebtorCreateOrConnectWithoutUserInput = {
    where: DebtorWhereUniqueInput
    create: XOR<DebtorCreateWithoutUserInput, DebtorUncheckedCreateWithoutUserInput>
  }

  export type DebtorCreateManyUserInputEnvelope = {
    data: DebtorCreateManyUserInput | DebtorCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type AccountCreateWithoutUserInput = {
    id?: string
    name: string
    createdAt?: Date | string
    updatedAt?: Date | string
    debts?: DebitCreateNestedManyWithoutAccountInput
  }

  export type AccountUncheckedCreateWithoutUserInput = {
    id?: string
    name: string
    createdAt?: Date | string
    updatedAt?: Date | string
    debts?: DebitUncheckedCreateNestedManyWithoutAccountInput
  }

  export type AccountCreateOrConnectWithoutUserInput = {
    where: AccountWhereUniqueInput
    create: XOR<AccountCreateWithoutUserInput, AccountUncheckedCreateWithoutUserInput>
  }

  export type AccountCreateManyUserInputEnvelope = {
    data: AccountCreateManyUserInput | AccountCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type DebtorUpsertWithWhereUniqueWithoutUserInput = {
    where: DebtorWhereUniqueInput
    update: XOR<DebtorUpdateWithoutUserInput, DebtorUncheckedUpdateWithoutUserInput>
    create: XOR<DebtorCreateWithoutUserInput, DebtorUncheckedCreateWithoutUserInput>
  }

  export type DebtorUpdateWithWhereUniqueWithoutUserInput = {
    where: DebtorWhereUniqueInput
    data: XOR<DebtorUpdateWithoutUserInput, DebtorUncheckedUpdateWithoutUserInput>
  }

  export type DebtorUpdateManyWithWhereWithoutUserInput = {
    where: DebtorScalarWhereInput
    data: XOR<DebtorUpdateManyMutationInput, DebtorUncheckedUpdateManyWithoutUserInput>
  }

  export type DebtorScalarWhereInput = {
    AND?: DebtorScalarWhereInput | DebtorScalarWhereInput[]
    OR?: DebtorScalarWhereInput[]
    NOT?: DebtorScalarWhereInput | DebtorScalarWhereInput[]
    id?: StringFilter<"Debtor"> | string
    name?: StringFilter<"Debtor"> | string
    email?: StringNullableFilter<"Debtor"> | string | null
    phone?: StringNullableFilter<"Debtor"> | string | null
    userId?: StringFilter<"Debtor"> | string
  }

  export type AccountUpsertWithWhereUniqueWithoutUserInput = {
    where: AccountWhereUniqueInput
    update: XOR<AccountUpdateWithoutUserInput, AccountUncheckedUpdateWithoutUserInput>
    create: XOR<AccountCreateWithoutUserInput, AccountUncheckedCreateWithoutUserInput>
  }

  export type AccountUpdateWithWhereUniqueWithoutUserInput = {
    where: AccountWhereUniqueInput
    data: XOR<AccountUpdateWithoutUserInput, AccountUncheckedUpdateWithoutUserInput>
  }

  export type AccountUpdateManyWithWhereWithoutUserInput = {
    where: AccountScalarWhereInput
    data: XOR<AccountUpdateManyMutationInput, AccountUncheckedUpdateManyWithoutUserInput>
  }

  export type AccountScalarWhereInput = {
    AND?: AccountScalarWhereInput | AccountScalarWhereInput[]
    OR?: AccountScalarWhereInput[]
    NOT?: AccountScalarWhereInput | AccountScalarWhereInput[]
    id?: StringFilter<"Account"> | string
    name?: StringFilter<"Account"> | string
    createdAt?: DateTimeFilter<"Account"> | Date | string
    updatedAt?: DateTimeFilter<"Account"> | Date | string
    userId?: StringFilter<"Account"> | string
  }

  export type UserCreateWithoutDebtorsInput = {
    id?: string
    name: string
    email: string
    password: string
    createdAt?: Date | string
    updatedAt?: Date | string
    accounts?: AccountCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutDebtorsInput = {
    id?: string
    name: string
    email: string
    password: string
    createdAt?: Date | string
    updatedAt?: Date | string
    accounts?: AccountUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutDebtorsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutDebtorsInput, UserUncheckedCreateWithoutDebtorsInput>
  }

  export type DebitCreateWithoutDebtorInput = {
    id?: string
    description: string
    totalAmount: Decimal | DecimalJsLike | number | string
    installmentQty: number
    startDate: Date | string
    dueDay: number
    status?: $Enums.DebitStatus
    createdAt?: Date | string
    updatedAt?: Date | string
    account: AccountCreateNestedOneWithoutDebtsInput
    installments?: InstallmentCreateNestedManyWithoutDebitInput
  }

  export type DebitUncheckedCreateWithoutDebtorInput = {
    id?: string
    description: string
    totalAmount: Decimal | DecimalJsLike | number | string
    installmentQty: number
    startDate: Date | string
    dueDay: number
    status?: $Enums.DebitStatus
    accountId: string
    createdAt?: Date | string
    updatedAt?: Date | string
    installments?: InstallmentUncheckedCreateNestedManyWithoutDebitInput
  }

  export type DebitCreateOrConnectWithoutDebtorInput = {
    where: DebitWhereUniqueInput
    create: XOR<DebitCreateWithoutDebtorInput, DebitUncheckedCreateWithoutDebtorInput>
  }

  export type DebitCreateManyDebtorInputEnvelope = {
    data: DebitCreateManyDebtorInput | DebitCreateManyDebtorInput[]
    skipDuplicates?: boolean
  }

  export type UserUpsertWithoutDebtorsInput = {
    update: XOR<UserUpdateWithoutDebtorsInput, UserUncheckedUpdateWithoutDebtorsInput>
    create: XOR<UserCreateWithoutDebtorsInput, UserUncheckedCreateWithoutDebtorsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutDebtorsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutDebtorsInput, UserUncheckedUpdateWithoutDebtorsInput>
  }

  export type UserUpdateWithoutDebtorsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    accounts?: AccountUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutDebtorsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    accounts?: AccountUncheckedUpdateManyWithoutUserNestedInput
  }

  export type DebitUpsertWithWhereUniqueWithoutDebtorInput = {
    where: DebitWhereUniqueInput
    update: XOR<DebitUpdateWithoutDebtorInput, DebitUncheckedUpdateWithoutDebtorInput>
    create: XOR<DebitCreateWithoutDebtorInput, DebitUncheckedCreateWithoutDebtorInput>
  }

  export type DebitUpdateWithWhereUniqueWithoutDebtorInput = {
    where: DebitWhereUniqueInput
    data: XOR<DebitUpdateWithoutDebtorInput, DebitUncheckedUpdateWithoutDebtorInput>
  }

  export type DebitUpdateManyWithWhereWithoutDebtorInput = {
    where: DebitScalarWhereInput
    data: XOR<DebitUpdateManyMutationInput, DebitUncheckedUpdateManyWithoutDebtorInput>
  }

  export type DebitScalarWhereInput = {
    AND?: DebitScalarWhereInput | DebitScalarWhereInput[]
    OR?: DebitScalarWhereInput[]
    NOT?: DebitScalarWhereInput | DebitScalarWhereInput[]
    id?: StringFilter<"Debit"> | string
    description?: StringFilter<"Debit"> | string
    totalAmount?: DecimalFilter<"Debit"> | Decimal | DecimalJsLike | number | string
    installmentQty?: IntFilter<"Debit"> | number
    startDate?: DateTimeFilter<"Debit"> | Date | string
    dueDay?: IntFilter<"Debit"> | number
    status?: EnumDebitStatusFilter<"Debit"> | $Enums.DebitStatus
    debtorId?: StringFilter<"Debit"> | string
    accountId?: StringFilter<"Debit"> | string
    createdAt?: DateTimeFilter<"Debit"> | Date | string
    updatedAt?: DateTimeFilter<"Debit"> | Date | string
  }

  export type DebtorCreateWithoutDebtsInput = {
    id?: string
    name: string
    email?: string | null
    phone?: string | null
    user: UserCreateNestedOneWithoutDebtorsInput
  }

  export type DebtorUncheckedCreateWithoutDebtsInput = {
    id?: string
    name: string
    email?: string | null
    phone?: string | null
    userId: string
  }

  export type DebtorCreateOrConnectWithoutDebtsInput = {
    where: DebtorWhereUniqueInput
    create: XOR<DebtorCreateWithoutDebtsInput, DebtorUncheckedCreateWithoutDebtsInput>
  }

  export type AccountCreateWithoutDebtsInput = {
    id?: string
    name: string
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutAccountsInput
  }

  export type AccountUncheckedCreateWithoutDebtsInput = {
    id?: string
    name: string
    createdAt?: Date | string
    updatedAt?: Date | string
    userId: string
  }

  export type AccountCreateOrConnectWithoutDebtsInput = {
    where: AccountWhereUniqueInput
    create: XOR<AccountCreateWithoutDebtsInput, AccountUncheckedCreateWithoutDebtsInput>
  }

  export type InstallmentCreateWithoutDebitInput = {
    id?: string
    amount: Decimal | DecimalJsLike | number | string
    dueDate: Date | string
    paidDate?: Date | string | null
    status?: $Enums.InstallmentStatus
    payments?: PaymentCreateNestedManyWithoutInstallmentInput
  }

  export type InstallmentUncheckedCreateWithoutDebitInput = {
    id?: string
    amount: Decimal | DecimalJsLike | number | string
    dueDate: Date | string
    paidDate?: Date | string | null
    status?: $Enums.InstallmentStatus
    payments?: PaymentUncheckedCreateNestedManyWithoutInstallmentInput
  }

  export type InstallmentCreateOrConnectWithoutDebitInput = {
    where: InstallmentWhereUniqueInput
    create: XOR<InstallmentCreateWithoutDebitInput, InstallmentUncheckedCreateWithoutDebitInput>
  }

  export type InstallmentCreateManyDebitInputEnvelope = {
    data: InstallmentCreateManyDebitInput | InstallmentCreateManyDebitInput[]
    skipDuplicates?: boolean
  }

  export type DebtorUpsertWithoutDebtsInput = {
    update: XOR<DebtorUpdateWithoutDebtsInput, DebtorUncheckedUpdateWithoutDebtsInput>
    create: XOR<DebtorCreateWithoutDebtsInput, DebtorUncheckedCreateWithoutDebtsInput>
    where?: DebtorWhereInput
  }

  export type DebtorUpdateToOneWithWhereWithoutDebtsInput = {
    where?: DebtorWhereInput
    data: XOR<DebtorUpdateWithoutDebtsInput, DebtorUncheckedUpdateWithoutDebtsInput>
  }

  export type DebtorUpdateWithoutDebtsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    user?: UserUpdateOneRequiredWithoutDebtorsNestedInput
  }

  export type DebtorUncheckedUpdateWithoutDebtsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    userId?: StringFieldUpdateOperationsInput | string
  }

  export type AccountUpsertWithoutDebtsInput = {
    update: XOR<AccountUpdateWithoutDebtsInput, AccountUncheckedUpdateWithoutDebtsInput>
    create: XOR<AccountCreateWithoutDebtsInput, AccountUncheckedCreateWithoutDebtsInput>
    where?: AccountWhereInput
  }

  export type AccountUpdateToOneWithWhereWithoutDebtsInput = {
    where?: AccountWhereInput
    data: XOR<AccountUpdateWithoutDebtsInput, AccountUncheckedUpdateWithoutDebtsInput>
  }

  export type AccountUpdateWithoutDebtsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutAccountsNestedInput
  }

  export type AccountUncheckedUpdateWithoutDebtsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userId?: StringFieldUpdateOperationsInput | string
  }

  export type InstallmentUpsertWithWhereUniqueWithoutDebitInput = {
    where: InstallmentWhereUniqueInput
    update: XOR<InstallmentUpdateWithoutDebitInput, InstallmentUncheckedUpdateWithoutDebitInput>
    create: XOR<InstallmentCreateWithoutDebitInput, InstallmentUncheckedCreateWithoutDebitInput>
  }

  export type InstallmentUpdateWithWhereUniqueWithoutDebitInput = {
    where: InstallmentWhereUniqueInput
    data: XOR<InstallmentUpdateWithoutDebitInput, InstallmentUncheckedUpdateWithoutDebitInput>
  }

  export type InstallmentUpdateManyWithWhereWithoutDebitInput = {
    where: InstallmentScalarWhereInput
    data: XOR<InstallmentUpdateManyMutationInput, InstallmentUncheckedUpdateManyWithoutDebitInput>
  }

  export type InstallmentScalarWhereInput = {
    AND?: InstallmentScalarWhereInput | InstallmentScalarWhereInput[]
    OR?: InstallmentScalarWhereInput[]
    NOT?: InstallmentScalarWhereInput | InstallmentScalarWhereInput[]
    id?: StringFilter<"Installment"> | string
    amount?: DecimalFilter<"Installment"> | Decimal | DecimalJsLike | number | string
    dueDate?: DateTimeFilter<"Installment"> | Date | string
    paidDate?: DateTimeNullableFilter<"Installment"> | Date | string | null
    status?: EnumInstallmentStatusFilter<"Installment"> | $Enums.InstallmentStatus
    debitId?: StringFilter<"Installment"> | string
  }

  export type PaymentCreateWithoutInstallmentInput = {
    id?: string
    amount: Decimal | DecimalJsLike | number | string
    paymentDate: Date | string
  }

  export type PaymentUncheckedCreateWithoutInstallmentInput = {
    id?: string
    amount: Decimal | DecimalJsLike | number | string
    paymentDate: Date | string
  }

  export type PaymentCreateOrConnectWithoutInstallmentInput = {
    where: PaymentWhereUniqueInput
    create: XOR<PaymentCreateWithoutInstallmentInput, PaymentUncheckedCreateWithoutInstallmentInput>
  }

  export type PaymentCreateManyInstallmentInputEnvelope = {
    data: PaymentCreateManyInstallmentInput | PaymentCreateManyInstallmentInput[]
    skipDuplicates?: boolean
  }

  export type DebitCreateWithoutInstallmentsInput = {
    id?: string
    description: string
    totalAmount: Decimal | DecimalJsLike | number | string
    installmentQty: number
    startDate: Date | string
    dueDay: number
    status?: $Enums.DebitStatus
    createdAt?: Date | string
    updatedAt?: Date | string
    debtor: DebtorCreateNestedOneWithoutDebtsInput
    account: AccountCreateNestedOneWithoutDebtsInput
  }

  export type DebitUncheckedCreateWithoutInstallmentsInput = {
    id?: string
    description: string
    totalAmount: Decimal | DecimalJsLike | number | string
    installmentQty: number
    startDate: Date | string
    dueDay: number
    status?: $Enums.DebitStatus
    debtorId: string
    accountId: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type DebitCreateOrConnectWithoutInstallmentsInput = {
    where: DebitWhereUniqueInput
    create: XOR<DebitCreateWithoutInstallmentsInput, DebitUncheckedCreateWithoutInstallmentsInput>
  }

  export type PaymentUpsertWithWhereUniqueWithoutInstallmentInput = {
    where: PaymentWhereUniqueInput
    update: XOR<PaymentUpdateWithoutInstallmentInput, PaymentUncheckedUpdateWithoutInstallmentInput>
    create: XOR<PaymentCreateWithoutInstallmentInput, PaymentUncheckedCreateWithoutInstallmentInput>
  }

  export type PaymentUpdateWithWhereUniqueWithoutInstallmentInput = {
    where: PaymentWhereUniqueInput
    data: XOR<PaymentUpdateWithoutInstallmentInput, PaymentUncheckedUpdateWithoutInstallmentInput>
  }

  export type PaymentUpdateManyWithWhereWithoutInstallmentInput = {
    where: PaymentScalarWhereInput
    data: XOR<PaymentUpdateManyMutationInput, PaymentUncheckedUpdateManyWithoutInstallmentInput>
  }

  export type PaymentScalarWhereInput = {
    AND?: PaymentScalarWhereInput | PaymentScalarWhereInput[]
    OR?: PaymentScalarWhereInput[]
    NOT?: PaymentScalarWhereInput | PaymentScalarWhereInput[]
    id?: StringFilter<"Payment"> | string
    amount?: DecimalFilter<"Payment"> | Decimal | DecimalJsLike | number | string
    paymentDate?: DateTimeFilter<"Payment"> | Date | string
    installmentId?: StringFilter<"Payment"> | string
  }

  export type DebitUpsertWithoutInstallmentsInput = {
    update: XOR<DebitUpdateWithoutInstallmentsInput, DebitUncheckedUpdateWithoutInstallmentsInput>
    create: XOR<DebitCreateWithoutInstallmentsInput, DebitUncheckedCreateWithoutInstallmentsInput>
    where?: DebitWhereInput
  }

  export type DebitUpdateToOneWithWhereWithoutInstallmentsInput = {
    where?: DebitWhereInput
    data: XOR<DebitUpdateWithoutInstallmentsInput, DebitUncheckedUpdateWithoutInstallmentsInput>
  }

  export type DebitUpdateWithoutInstallmentsInput = {
    id?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    totalAmount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    installmentQty?: IntFieldUpdateOperationsInput | number
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    dueDay?: IntFieldUpdateOperationsInput | number
    status?: EnumDebitStatusFieldUpdateOperationsInput | $Enums.DebitStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    debtor?: DebtorUpdateOneRequiredWithoutDebtsNestedInput
    account?: AccountUpdateOneRequiredWithoutDebtsNestedInput
  }

  export type DebitUncheckedUpdateWithoutInstallmentsInput = {
    id?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    totalAmount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    installmentQty?: IntFieldUpdateOperationsInput | number
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    dueDay?: IntFieldUpdateOperationsInput | number
    status?: EnumDebitStatusFieldUpdateOperationsInput | $Enums.DebitStatus
    debtorId?: StringFieldUpdateOperationsInput | string
    accountId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type InstallmentCreateWithoutPaymentsInput = {
    id?: string
    amount: Decimal | DecimalJsLike | number | string
    dueDate: Date | string
    paidDate?: Date | string | null
    status?: $Enums.InstallmentStatus
    debit: DebitCreateNestedOneWithoutInstallmentsInput
  }

  export type InstallmentUncheckedCreateWithoutPaymentsInput = {
    id?: string
    amount: Decimal | DecimalJsLike | number | string
    dueDate: Date | string
    paidDate?: Date | string | null
    status?: $Enums.InstallmentStatus
    debitId: string
  }

  export type InstallmentCreateOrConnectWithoutPaymentsInput = {
    where: InstallmentWhereUniqueInput
    create: XOR<InstallmentCreateWithoutPaymentsInput, InstallmentUncheckedCreateWithoutPaymentsInput>
  }

  export type InstallmentUpsertWithoutPaymentsInput = {
    update: XOR<InstallmentUpdateWithoutPaymentsInput, InstallmentUncheckedUpdateWithoutPaymentsInput>
    create: XOR<InstallmentCreateWithoutPaymentsInput, InstallmentUncheckedCreateWithoutPaymentsInput>
    where?: InstallmentWhereInput
  }

  export type InstallmentUpdateToOneWithWhereWithoutPaymentsInput = {
    where?: InstallmentWhereInput
    data: XOR<InstallmentUpdateWithoutPaymentsInput, InstallmentUncheckedUpdateWithoutPaymentsInput>
  }

  export type InstallmentUpdateWithoutPaymentsInput = {
    id?: StringFieldUpdateOperationsInput | string
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    dueDate?: DateTimeFieldUpdateOperationsInput | Date | string
    paidDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: EnumInstallmentStatusFieldUpdateOperationsInput | $Enums.InstallmentStatus
    debit?: DebitUpdateOneRequiredWithoutInstallmentsNestedInput
  }

  export type InstallmentUncheckedUpdateWithoutPaymentsInput = {
    id?: StringFieldUpdateOperationsInput | string
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    dueDate?: DateTimeFieldUpdateOperationsInput | Date | string
    paidDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: EnumInstallmentStatusFieldUpdateOperationsInput | $Enums.InstallmentStatus
    debitId?: StringFieldUpdateOperationsInput | string
  }

  export type UserCreateWithoutAccountsInput = {
    id?: string
    name: string
    email: string
    password: string
    createdAt?: Date | string
    updatedAt?: Date | string
    debtors?: DebtorCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutAccountsInput = {
    id?: string
    name: string
    email: string
    password: string
    createdAt?: Date | string
    updatedAt?: Date | string
    debtors?: DebtorUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutAccountsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutAccountsInput, UserUncheckedCreateWithoutAccountsInput>
  }

  export type DebitCreateWithoutAccountInput = {
    id?: string
    description: string
    totalAmount: Decimal | DecimalJsLike | number | string
    installmentQty: number
    startDate: Date | string
    dueDay: number
    status?: $Enums.DebitStatus
    createdAt?: Date | string
    updatedAt?: Date | string
    debtor: DebtorCreateNestedOneWithoutDebtsInput
    installments?: InstallmentCreateNestedManyWithoutDebitInput
  }

  export type DebitUncheckedCreateWithoutAccountInput = {
    id?: string
    description: string
    totalAmount: Decimal | DecimalJsLike | number | string
    installmentQty: number
    startDate: Date | string
    dueDay: number
    status?: $Enums.DebitStatus
    debtorId: string
    createdAt?: Date | string
    updatedAt?: Date | string
    installments?: InstallmentUncheckedCreateNestedManyWithoutDebitInput
  }

  export type DebitCreateOrConnectWithoutAccountInput = {
    where: DebitWhereUniqueInput
    create: XOR<DebitCreateWithoutAccountInput, DebitUncheckedCreateWithoutAccountInput>
  }

  export type DebitCreateManyAccountInputEnvelope = {
    data: DebitCreateManyAccountInput | DebitCreateManyAccountInput[]
    skipDuplicates?: boolean
  }

  export type UserUpsertWithoutAccountsInput = {
    update: XOR<UserUpdateWithoutAccountsInput, UserUncheckedUpdateWithoutAccountsInput>
    create: XOR<UserCreateWithoutAccountsInput, UserUncheckedCreateWithoutAccountsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutAccountsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutAccountsInput, UserUncheckedUpdateWithoutAccountsInput>
  }

  export type UserUpdateWithoutAccountsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    debtors?: DebtorUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutAccountsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    debtors?: DebtorUncheckedUpdateManyWithoutUserNestedInput
  }

  export type DebitUpsertWithWhereUniqueWithoutAccountInput = {
    where: DebitWhereUniqueInput
    update: XOR<DebitUpdateWithoutAccountInput, DebitUncheckedUpdateWithoutAccountInput>
    create: XOR<DebitCreateWithoutAccountInput, DebitUncheckedCreateWithoutAccountInput>
  }

  export type DebitUpdateWithWhereUniqueWithoutAccountInput = {
    where: DebitWhereUniqueInput
    data: XOR<DebitUpdateWithoutAccountInput, DebitUncheckedUpdateWithoutAccountInput>
  }

  export type DebitUpdateManyWithWhereWithoutAccountInput = {
    where: DebitScalarWhereInput
    data: XOR<DebitUpdateManyMutationInput, DebitUncheckedUpdateManyWithoutAccountInput>
  }

  export type DebtorCreateManyUserInput = {
    id?: string
    name: string
    email?: string | null
    phone?: string | null
  }

  export type AccountCreateManyUserInput = {
    id?: string
    name: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type DebtorUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    debts?: DebitUpdateManyWithoutDebtorNestedInput
  }

  export type DebtorUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    debts?: DebitUncheckedUpdateManyWithoutDebtorNestedInput
  }

  export type DebtorUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type AccountUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    debts?: DebitUpdateManyWithoutAccountNestedInput
  }

  export type AccountUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    debts?: DebitUncheckedUpdateManyWithoutAccountNestedInput
  }

  export type AccountUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DebitCreateManyDebtorInput = {
    id?: string
    description: string
    totalAmount: Decimal | DecimalJsLike | number | string
    installmentQty: number
    startDate: Date | string
    dueDay: number
    status?: $Enums.DebitStatus
    accountId: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type DebitUpdateWithoutDebtorInput = {
    id?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    totalAmount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    installmentQty?: IntFieldUpdateOperationsInput | number
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    dueDay?: IntFieldUpdateOperationsInput | number
    status?: EnumDebitStatusFieldUpdateOperationsInput | $Enums.DebitStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    account?: AccountUpdateOneRequiredWithoutDebtsNestedInput
    installments?: InstallmentUpdateManyWithoutDebitNestedInput
  }

  export type DebitUncheckedUpdateWithoutDebtorInput = {
    id?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    totalAmount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    installmentQty?: IntFieldUpdateOperationsInput | number
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    dueDay?: IntFieldUpdateOperationsInput | number
    status?: EnumDebitStatusFieldUpdateOperationsInput | $Enums.DebitStatus
    accountId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    installments?: InstallmentUncheckedUpdateManyWithoutDebitNestedInput
  }

  export type DebitUncheckedUpdateManyWithoutDebtorInput = {
    id?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    totalAmount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    installmentQty?: IntFieldUpdateOperationsInput | number
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    dueDay?: IntFieldUpdateOperationsInput | number
    status?: EnumDebitStatusFieldUpdateOperationsInput | $Enums.DebitStatus
    accountId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type InstallmentCreateManyDebitInput = {
    id?: string
    amount: Decimal | DecimalJsLike | number | string
    dueDate: Date | string
    paidDate?: Date | string | null
    status?: $Enums.InstallmentStatus
  }

  export type InstallmentUpdateWithoutDebitInput = {
    id?: StringFieldUpdateOperationsInput | string
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    dueDate?: DateTimeFieldUpdateOperationsInput | Date | string
    paidDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: EnumInstallmentStatusFieldUpdateOperationsInput | $Enums.InstallmentStatus
    payments?: PaymentUpdateManyWithoutInstallmentNestedInput
  }

  export type InstallmentUncheckedUpdateWithoutDebitInput = {
    id?: StringFieldUpdateOperationsInput | string
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    dueDate?: DateTimeFieldUpdateOperationsInput | Date | string
    paidDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: EnumInstallmentStatusFieldUpdateOperationsInput | $Enums.InstallmentStatus
    payments?: PaymentUncheckedUpdateManyWithoutInstallmentNestedInput
  }

  export type InstallmentUncheckedUpdateManyWithoutDebitInput = {
    id?: StringFieldUpdateOperationsInput | string
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    dueDate?: DateTimeFieldUpdateOperationsInput | Date | string
    paidDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: EnumInstallmentStatusFieldUpdateOperationsInput | $Enums.InstallmentStatus
  }

  export type PaymentCreateManyInstallmentInput = {
    id?: string
    amount: Decimal | DecimalJsLike | number | string
    paymentDate: Date | string
  }

  export type PaymentUpdateWithoutInstallmentInput = {
    id?: StringFieldUpdateOperationsInput | string
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    paymentDate?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PaymentUncheckedUpdateWithoutInstallmentInput = {
    id?: StringFieldUpdateOperationsInput | string
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    paymentDate?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PaymentUncheckedUpdateManyWithoutInstallmentInput = {
    id?: StringFieldUpdateOperationsInput | string
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    paymentDate?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DebitCreateManyAccountInput = {
    id?: string
    description: string
    totalAmount: Decimal | DecimalJsLike | number | string
    installmentQty: number
    startDate: Date | string
    dueDay: number
    status?: $Enums.DebitStatus
    debtorId: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type DebitUpdateWithoutAccountInput = {
    id?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    totalAmount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    installmentQty?: IntFieldUpdateOperationsInput | number
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    dueDay?: IntFieldUpdateOperationsInput | number
    status?: EnumDebitStatusFieldUpdateOperationsInput | $Enums.DebitStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    debtor?: DebtorUpdateOneRequiredWithoutDebtsNestedInput
    installments?: InstallmentUpdateManyWithoutDebitNestedInput
  }

  export type DebitUncheckedUpdateWithoutAccountInput = {
    id?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    totalAmount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    installmentQty?: IntFieldUpdateOperationsInput | number
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    dueDay?: IntFieldUpdateOperationsInput | number
    status?: EnumDebitStatusFieldUpdateOperationsInput | $Enums.DebitStatus
    debtorId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    installments?: InstallmentUncheckedUpdateManyWithoutDebitNestedInput
  }

  export type DebitUncheckedUpdateManyWithoutAccountInput = {
    id?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    totalAmount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    installmentQty?: IntFieldUpdateOperationsInput | number
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    dueDay?: IntFieldUpdateOperationsInput | number
    status?: EnumDebitStatusFieldUpdateOperationsInput | $Enums.DebitStatus
    debtorId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }



  /**
   * Aliases for legacy arg types
   */
    /**
     * @deprecated Use UserCountOutputTypeDefaultArgs instead
     */
    export type UserCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = UserCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use DebtorCountOutputTypeDefaultArgs instead
     */
    export type DebtorCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = DebtorCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use DebitCountOutputTypeDefaultArgs instead
     */
    export type DebitCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = DebitCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use InstallmentCountOutputTypeDefaultArgs instead
     */
    export type InstallmentCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = InstallmentCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use AccountCountOutputTypeDefaultArgs instead
     */
    export type AccountCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = AccountCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use UserDefaultArgs instead
     */
    export type UserArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = UserDefaultArgs<ExtArgs>
    /**
     * @deprecated Use DebtorDefaultArgs instead
     */
    export type DebtorArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = DebtorDefaultArgs<ExtArgs>
    /**
     * @deprecated Use DebitDefaultArgs instead
     */
    export type DebitArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = DebitDefaultArgs<ExtArgs>
    /**
     * @deprecated Use InstallmentDefaultArgs instead
     */
    export type InstallmentArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = InstallmentDefaultArgs<ExtArgs>
    /**
     * @deprecated Use PaymentDefaultArgs instead
     */
    export type PaymentArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = PaymentDefaultArgs<ExtArgs>
    /**
     * @deprecated Use AccountDefaultArgs instead
     */
    export type AccountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = AccountDefaultArgs<ExtArgs>

  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}