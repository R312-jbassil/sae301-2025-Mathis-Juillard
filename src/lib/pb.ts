import PocketBase from 'pocketbase';
type TypedPocketBase = PocketBase;
var path='';
if(import.meta.env.MODE === 'development')
    path = 'http://localhost:8090'    //localhost = machine de dev
else path = 'https://sae-301.mathis-juillard.fr:443'   //localhost = machine de déploiement
const pb = new PocketBase(path) as TypedPocketBase;
export default pb;

