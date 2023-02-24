import { factory, NodeFlags, SyntaxKind } from 'typescript';
import camelcase from 'camelcase';

interface Base {
  identifierName: string;
  iconName: string;
}

export function createStatement({
  identifierName,
  svgContent,
  iconName,
}: Base & { svgContent: string }) {
  return factory.createVariableStatement(
    [factory.createModifier(SyntaxKind.ExportKeyword)],
    factory.createVariableDeclarationList(
      [
        factory.createVariableDeclaration(
          factory.createIdentifier(identifierName),
          undefined,
          undefined,
          factory.createObjectLiteralExpression(
            [
              factory.createPropertyAssignment(
                factory.createIdentifier('data'),
                factory.createNoSubstitutionTemplateLiteral(svgContent)
              ),
              factory.createPropertyAssignment(
                factory.createIdentifier('name'),
                factory.createAsExpression(
                  factory.createStringLiteral(iconName, true),
                  factory.createTypeReferenceNode(
                    factory.createIdentifier('const'),
                    undefined
                  )
                )
              ),
            ],
            true
          )
        ),
      ],
      NodeFlags.Const
    )
  );
}

export function createExportDeclaration({ iconName }: Base) {
  return factory.createExportDeclaration(
    undefined,
    undefined,
    false,
    undefined,
    factory.createStringLiteral(`./${iconName}`, true)
  );
}

export function createArrayExport(arrayName: string, identifiers: string[]) {
  return factory.createVariableStatement(
    [factory.createModifier(SyntaxKind.ExportKeyword)],
    factory.createVariableDeclarationList(
      [
        factory.createVariableDeclaration(
          factory.createIdentifier(camelcase(`${arrayName}Icons`)),
          undefined,
          undefined,
          factory.createArrayLiteralExpression(
            identifiers.map((id) => factory.createIdentifier(id)),
            false
          )
        ),
      ],
      NodeFlags.Const
    )
  );
}
