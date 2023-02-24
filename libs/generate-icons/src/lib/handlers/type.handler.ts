import {
  createPrinter,
  createSourceFile,
  factory,
  NewLineKind,
  ScriptKind,
  ScriptTarget,
  SyntaxKind,
} from 'typescript';

const printer = createPrinter({
  newLine: NewLineKind.LineFeed,
});

const sourceFile = createSourceFile(
  'types.ts',
  '',
  ScriptTarget.Latest,
  false,
  ScriptKind.TS
);

export function createTypeFile(names: string[], typeName: string) {
  const block = [
    factory.createTypeAliasDeclaration(
      [
        factory.createModifier(SyntaxKind.ExportKeyword),
        factory.createModifier(SyntaxKind.DeclareKeyword),
      ],
      factory.createIdentifier(typeName),
      undefined,
      factory.createUnionTypeNode([
        ...names.map((name) => {
          return factory.createLiteralTypeNode(
            factory.createStringLiteral(name, true)
          );
        }),
        factory.createTypeReferenceNode('string'),
      ])
    ),
  ];

  const file = factory.updateSourceFile(sourceFile, block);
  return printer.printFile(file);
}
