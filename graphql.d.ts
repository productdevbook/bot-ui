declare module '*.graphql' {
  // @ts-ignore
  import { DocumentNode } from 'graphql';
  const Schema: DocumentNode;

  export = Schema;
}
