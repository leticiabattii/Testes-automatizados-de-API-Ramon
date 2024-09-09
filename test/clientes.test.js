const request = require('supertest')
const app = require('../index')

describe('GET /clientes', () =>{
    it('pegar a lista de clientes com sucesso', async () => {
        const res = await request(app).get('/clientes').send();
        expect(res.status).toBe(200);
    
});
    it('verificar se a lista de clientes está cheia', async() =>{
        const res = await request (app).get('/clientes').send();
        expect(res.body.toBefined);
    }); 
})

describe('Criar /clientes', () => {
    it('criar cliente com sucesso', async() => {
        const res = await request(app).post('/clientes').send(
            {
                nome:'vitor teste',
                email:'vitor@teste.com',
                senha:'senhasupervitor',
            }
            );
            expect(res.status).toBe(204)
        });
    })
    
describe('GET /clientes/:id', () => {
    it('pegar informações do cliente pelo id com sucesso', async () => {
        const res = await request(app).get('/clientes/936cd5ae-9628-452b-ad37-bebeb5385503').send();
        expect(res.status).toBe(200);
    })
})
    

describe('Criar /clientes/:id', () => {
    it('atualizar o nome do cliente com sucesso', async () => {
        const res = await request(app).post('/clientes/936cd5ae-9628-452b-ad37-bebeb5385503').send(
            {
                nome:'vitor update',
            }
        )
        expect(res.status).toBe(200)
    })
})

// describe('deletar /clientes/:id', () => {
//     it('deletar um cliente com sucesso', async () => {
//         const res = await request(app).delete('/clientes/936cd5ae-9628-452b-ad37-bebeb5385503').send(
//             {
//                 nome:'vitor update'
//             })
//         expect(res.status).toBe(204)
//     })
// } )