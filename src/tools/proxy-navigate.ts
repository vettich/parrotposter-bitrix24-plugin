import { navigate as origNavigate } from "svelte-navigator";

const baseUrl = import.meta.env.BASE_URL;

const normalizePath = (path: string) => path.replace(/[\\/]+/g, '/');

const withBasePath = (path: string) => normalizePath(baseUrl + path);

const navigate: (
  to: string,
  {
    replace,
    state
  }?: {
    replace?: boolean;
    state?: {
      [k in string | number]: unknown;
    };
  }
) => void = (to, options) => {
	origNavigate(withBasePath(to), options);
}

export {
	navigate,
	withBasePath,
}
