import { Analyse } from "./crowller";
export default class Analyzer implements Analyse {
  public analyze(html: string) {
    return html;
  }
}
