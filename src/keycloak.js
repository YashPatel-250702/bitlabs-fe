import Keycloak from 'keycloak-js';
const keycloak = new Keycloak({
    url: 'https://sso.your-brand.com',
    realm: 'gamma-threads',
    clientId: 'bitlabs-jobs-app'});
export default keycloak;