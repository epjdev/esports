import express from 'express'
import cors from 'cors'

import { PrismaClient } from '@prisma/client'

import { convertHoursToMinutes } from './utils/convertHourToMinutes';
import { convertMinutesToHours } from './utils/convertMinutesToHour';

const app = express();

app.use(express.json());
app.use(cors());

const prisma = new PrismaClient();

app.get('/games', async (request, response) => {
    const games = await prisma.game.findMany({
        include: {
            _count: {
                select: {
                    ads: true
                }
            }
        }
    }
    );

    return response.json(games);
})

app.get('/games/:id/ads', async (request, response) => {
    const gameId = request.params.id;
    
    const adsByGame = await prisma.ad.findMany({
        select: {
            id: true,
            name: true,
            weekDays: true,
            useVoiceChannel: true,
            yearsPlaying: true,
            hoursStart: true,
            hoursEnd: true
        },
        where: {
            gameId: gameId
        },
        orderBy: {
            createdAt: 'desc'
        }
    });
    
    const formatedAds = adsByGame.map(ad => {
        return {
            ...ad,
            weekDays: ad.weekDays.split(','),
            hoursStart: convertMinutesToHours(ad.hoursStart),
            hoursEnd: convertMinutesToHours(ad.hoursEnd)
        }
    })

    return response.json(formatedAds);
});

app.get('/ads/:id/discord', async (request, response) => {
    const adId = request.params.id;
    
    const discordByAd = await prisma.ad.findUniqueOrThrow({
        select:{
            discord: true
        },
        where: {
            id: adId
        }
    })

    return response.json(discordByAd);
});

app.post('/games/:id/ad', async (request, response) => {
    const gameId = request.params.id;
    const newAddInfo = request.body;

    const createdAd = await prisma.ad.create({
        data: {
            gameId: gameId,
            name: newAddInfo.name,
            yearsPlaying: newAddInfo.yearsPlaying,
            discord: newAddInfo.discord,
            weekDays: newAddInfo.weekDays.join(','),
            hoursStart: convertHoursToMinutes(newAddInfo.hoursStart),
            hoursEnd: convertHoursToMinutes(newAddInfo.hoursEnd),
            useVoiceChannel: newAddInfo.useVoiceChannel
        }
    })

    return response.status(201).json(createdAd);
})

app.listen(3333);