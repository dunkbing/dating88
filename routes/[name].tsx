import { PageProps } from "$fresh/server.ts";
import { useEffect } from "preact/hooks";

export default function Greet(props: PageProps) {
  return <div>Hello {props.params.name}</div>;
}
