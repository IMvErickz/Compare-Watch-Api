import { prisma } from "../src/lib/prisma";

async function Seed() {
    await prisma.watch.create({
        data: {
            name: 'SEAMASTER AQUA TERRA 150M',
            description: '41 MM, AÇO EM AÇO',
            price: 20.45800,
            dialColor: 'Azul',
            boxMaterial: 'Aço',
            boxSize: '41 mm',
            braceletMaterial: 'Aço',
            extras: 'Braceletes variados',
            link: 'https://www.omegawatches.com/pt/watch-omega-seamaster-aqua-terra-150m-co-axial-master-chronometer-41-mm-22010412103004',
            movimentType: 'Corda automática',
            originCountry: 'Suiça',
            releaseYear: 2023
        }
    })
}

Seed()