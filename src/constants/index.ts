import { RingStats, RingType } from '../types';

export const RING_NAMES: Record<RingType, string> = {
    luck: '운반지',
    health: '체력반지',
    resistance: '저항반지'
};

export const STAT_NAMES: Record<string, string> = {
    luck: '운',
    health: '체력',
    resistance: '저항',
    innerForce: '내공',
    attack: '공격력'
};

export const BASE_STATS: Record<RingType, RingStats> = {
    luck: { luck: 3 },
    health: { health: 2 },
    resistance: { resistance: 1 }
};

export const ENHANCEMENT_STATS: Record<RingType, Record<number, RingStats>> = {
    luck: {
        1: { luck: 6 },
        2: { luck: 9 },
        3: { luck: 12 },
        4: { luck: 15, resistance: 1 },
        5: { luck: 18, resistance: 2, innerForce: 1 },
        6: { luck: 21, resistance: 3, innerForce: 1, attack: 1 }
    },
    health: {
        1: { health: 4 },
        2: { health: 6 },
        3: { health: 8, resistance: 1 },
        4: { health: 10, resistance: 2 },
        5: { health: 12, resistance: 2, innerForce: 1 },
        6: { health: 14, resistance: 3, innerForce: 1, attack: 1 }
    },
    resistance: {
        1: { resistance: 2 },
        2: { resistance: 3 },
        3: { resistance: 5 },
        4: { resistance: 7, innerForce: 1 },
        5: { resistance: 8, innerForce: 2 },
        6: { resistance: 10, innerForce: 3, attack: 1 }
    }
};

export const ENHANCE_RATES = {
    success: 20,
    destroy: 80
};

export const ENHANCEMENT_STONE_TYPES = {
    normal: {
        name: '강화석',
        cost: 5000,
        successRate: 0,
        materials: {
            iron: 3,
            darkIron: 1,
            blackIron: 1,
            lapislazuli: 5
        },
        craftSuccessRate: 80
    },
    advanced: {
        name: '상급 장비 강화석',
        cost: 10000,
        successRate: 5,
        materials: {
            enhancementStone: 1,
            iron: 3,
            darkIron: 1,
            blackIron: 1,
            lapislazuli: 5
        },
        craftSuccessRate: 100
    },
    premium: {
        name: '고급 장비 강화석',
        cost: 20000,
        successRate: 10,
        materials: {
            enhancementStone: 1,
            iron: 3,
            darkIron: 1,
            blackIron: 1,
            lapislazuli: 5
        },
        craftSuccessRate: 100
    }
} as const;