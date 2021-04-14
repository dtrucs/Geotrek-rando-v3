import { RawSensitiveArea, SensitiveArea } from './interface';

export const adaptSensitiveAreas = ({
  rawSensitiveAreas,
}: {
  rawSensitiveAreas: RawSensitiveArea[];
}): SensitiveArea[] =>
  rawSensitiveAreas.map(rawSensitiveArea => ({
    name: rawSensitiveArea.name ?? null,
    description: rawSensitiveArea.description ?? null,
    contact: rawSensitiveArea.contact ?? null,
    infoUrl: rawSensitiveArea.info_url ?? null,
    period: rawSensitiveArea.period ?? null,
  }));
