// Es6 模块化
declare module "jquery" {
  // 定义全局函数
  interface JqueryInstance {
    html: (html: string) => JqueryInstance;
  }
  function $(readyFunc: () => void): void;
  function $(selector: string): JqueryInstance;
  namespace $ {
    namespace fn {
      class init {}
    }
  }

  export = $;
}
