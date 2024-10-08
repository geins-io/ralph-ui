export default class AuthClient {
  constructor(signEndpoint, authEndpoint) {
    if (!signEndpoint || !authEndpoint) {
      throw new Error('An endpoint that can verify identities is required');
    }
    this.authEndpoint = authEndpoint;
    this.signAccount = signEndpoint;
  }

  // Reads headers from response and sets refresh token if available
  readHeaders(response) {
    const refreshToken = response.headers.get('x-auth-refresh-token');
    if (refreshToken) {
      this.setRefreshToken(refreshToken);
    }
    return response;
  }

  // Sets refresh token
  setRefreshToken(refreshToken) {
    this.refreshToken = refreshToken;
  }

  // Sets token and token max age
  setTokenData(data) {
    this.token = data.token;
    this.maxAge = data.maxAge;
  }

  // Connects to auth endpoint with selected action. If no credentials or action is passed, a token refresh is made
  async connect(credentials, action = 'login') {
    this.setTokenData({ token: false, maxAge: false });

    const url = this.authEndpoint + action;
    const getSign = !!credentials;
    const auth = { username: credentials?.username };

    const fetchOptions = {
      method: getSign ? 'POST' : 'GET',
      cache: 'no-cache',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    };
    if (getSign) {
      fetchOptions.body = JSON.stringify(auth);
    }

    const addRefreshToken = () => {
      if (this.refreshToken) {
        fetchOptions.headers['x-auth-refresh-token'] = this.refreshToken;
      }
    };

    addRefreshToken();

    // Function that adds signature, password and other options to auth request body
    const addCredentials = async (sign) => {
      auth.signature = await this.signAccount(sign);
      auth.password = await this.digest(credentials.password);
      if (action === 'password') {
        auth.newPassword = await this.digest(credentials.newPassword);
      }
      if (!credentials.rememberUser) {
        auth.sessionLifetime = 30;
      }
      fetchOptions.body = JSON.stringify(auth);
      addRefreshToken();
    };

    let data = await fetch(url, fetchOptions)
      .then((response) => this.readHeaders(response))
      .then((response) => response.json())
      .catch(() => {});
    if (data?.sign) {
      await addCredentials(data.sign);
      data = await fetch(url, fetchOptions)
        .then((response) => this.readHeaders(response))
        .then((response) => response.json())
        .then((data) => {
          if (data?.token) {
            this.setTokenData(data);
          }
        })
        .catch(() => {});
    } else if (data?.token) {
      this.setTokenData(data);
    }
  }

  async digest(password) {
    const salt =
      'Dd1dfLonNy6Am2fXQl2AcoI+IbhLhXvaibnDNn8uEa6vbJ05eyJajSuGFm9uQSmD';
    const buffer = await crypto.subtle.digest(
      'SHA-384',
      new TextEncoder('utf-8').encode(password + salt),
    );
    return btoa(String.fromCharCode(...new Uint8Array(buffer)));
  }

  get authorized() {
    return !!this.token;
  }

  get claims() {
    return JSON.parse(atob(this.token.split('.')[1]));
  }

  get serializedClaims() {
    const c = this.claims;
    let r = '';
    for (const n in c) {
      if (c[n].push) {
        for (const i in c[n]) {
          r += ';' + n + '=' + c[n][i];
        }
      } else {
        r += ';' + n + '=' + c[n];
      }
    }
    return r.substr(1);
  }

  get(endpoint) {
    return this.sendRequest('GET', endpoint);
  }

  async sendRequest(method, endpoint) {
    try {
      const response = await fetch(endpoint, {
        method,
        cache: 'no-cache',
      });
      const data = await response.json();
      return data;
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error('geins auth client error', err);
    }
  }
}
