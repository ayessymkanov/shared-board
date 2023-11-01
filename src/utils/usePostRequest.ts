import { useState } from "react";

type Error = {
  message: string;
}

type Data = Record<string, any>;

type Path = "signin" | "signup" | "verify" | "forgot" | "reset" | "validateReset";

const apiUrl = import.meta.env.VITE_AUTH_API_URL;

const url: Record<Path, string> = {
  signin: `${apiUrl}/signin`,
  signup: `${apiUrl}/signup`,
  verify: `${apiUrl}/verify`,
  forgot: `${apiUrl}/forgot`,
  reset: `${apiUrl}/reset`,
  validateReset: `${apiUrl}/validate-reset`,
}

export default (path: Path) => {
  const [data, setData] = useState<Data | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const makeRequest = async (body: Record<string, any>) => {
    setLoading(true);
    try {
      const resp = await fetch(url[path], {
        method: 'POST',
        body: JSON.stringify(body),
        headers: {
          'Content-Type': 'application/json',
        }
      });

      const response = await resp.json();

      if (response.error !== null) {
        setError(response.error);
      }

      if (response.data) {
        setError(null);
        setData(response.data);
      }

    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  }

  return [makeRequest, { data, error, loading }] as const;
}
