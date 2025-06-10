import { ZTypedocConfigBuilder } from "@zthun/janitor-build-config/typedoc";

export default new ZTypedocConfigBuilder()
  .web()
  .entry("../*")
  .name("Webigail")
  .favicon("public/images/svg/webigail.svg")
  .build();
