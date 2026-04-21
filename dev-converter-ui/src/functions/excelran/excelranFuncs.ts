/* eslint-disable @typescript-eslint/no-explicit-any */

class ExcelranFunctions {
  JSONtoCSV(arr: string = "[]"): string {
    if (!arr.includes("[") || !arr.includes("]")) return "";

    let parsed: any;
    try {
      parsed = JSON.parse(arr);
    } catch {
      return "";
    }

    if (!Array.isArray(parsed)) return "";

    const columns = Object.keys(parsed[0] || {});

    return [
      columns.join(","),
      ...parsed.map((obj: any) =>
        columns.map((key) => `"${obj[key] ?? ""}"`).join(","),
      ),
    ].join("\n");
  }

  arrayToCSV(arr: string, delimiter = ","): string {
    if (!arr.includes("[") || !arr.includes("]")) return "";

    let parsed: any;
    try {
      parsed = JSON.parse(arr);
    } catch {
      return "";
    }

    if (!Array.isArray(parsed)) return "";

    return parsed
      .map((row: any[]) =>
        row
          .map((x: any) =>
            isNaN(x) ? `"${String(x).replace(/"/g, '""')}"` : x,
          )
          .join(delimiter),
      )
      .join("\n");
  }

  CSVtoJSON(data: string, delimiter = ",") {
    const titles = data.slice(0, data.indexOf("\n")).split(delimiter);

    return data
      .slice(data.indexOf("\n") + 1)
      .split("\n")
      .map((row) => {
        const values = row.split(delimiter);

        return titles.reduce((obj: any, title, index) => {
          obj[title] = values[index];
          return obj;
        }, {});
      });
  }

  CSVToArray(data: string, delimiter = ",", omitFirstRow = false) {
    return data
      .slice(omitFirstRow ? data.indexOf("\n") + 1 : 0)
      .split("\n")
      .map((row) => row.split(delimiter));
  }
}

const AEF = new ExcelranFunctions();
export default AEF;
