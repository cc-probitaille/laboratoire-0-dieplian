// Vous devez insérer les nouveaux tests ici
import { assert } from 'console';
import supertest from 'supertest';
import 'jest-extended';
import app from '../../src/app';

// describe('redemarrerJeu.test.ts', () => {
//   it("devrait implémenter test", async () => {
//     throw new Error("Ce test n'a pas été défini")
//   });
// });
 const testNom1 = 'Jean-Marc';
 const testNom2 = 'Pierre';
 const request = supertest(app);

describe('GET /api/v1/jeu/redemarrerJeu', () => {
  beforeAll(async () => {
  
    await request.post('/api/v1/jeu/demarrerJeu').send({ nom: testNom1 });


  });

it(`devrait répondre avec une mauvaise demande lorsque le joueur n'existe pas ${testNom2}`, async () => {
        const response = await request.get('/api/v1/jeu/redemarrerJeu/' + testNom2);
        expect(response.status).toBe(404);
        expect(response.type).toBe("application/json");
        expect(response.body.error).toInclude("n'existe pas");
        expect(response.body.error).toInclude(testNom2);
    });

    it(`devrait répondre avec un appel réussi pour le joueur ${testNom1}`, async () => {
        const response = await request.get('/api/v1/jeu/redemarrerJeu/' + testNom1);
        const resultat = JSON.parse(response.body.resultat);
        expect(response.status).toBe(200);
        expect(response.type).toBe("application/json");
        expect(resultat.nom).toBe(testNom1);
        expect(resultat.message).toInclude("Redémarré"); 
        expect(resultat.joueurs).toInclude("0"); // Aucun joueur restant
       
    });

    //     it(`Aucun joueur`, async () => {
    //     const response = await request.get('/api/v1/jeu/joueurs' );
    //     // console.log(response);
    //     // const resultat = JSON.parse(response.body.resultat);
    //     expect(response.status).toBe(200);
    //     // expect(response.type).toBe("application/json");
    //     // expect(resultat.nom).toBe(testNom1);
    //     // expect(resultat.message).toInclude("redémarré"); 
    // });
});