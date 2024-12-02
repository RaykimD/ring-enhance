export type RingType = 'luck' | 'health' | 'resistance';

export type RingStats = {
    luck?: number;
    health?: number;
    resistance?: number;
    innerForce?: number;
    attack?: number;
};

export type Ring = {
    id: string;
    type: RingType;
    enhancement: number;
    stats: RingStats;
};

export type EnhanceLog = {
    type: 'success' | 'destroy';
    ringType: RingType;
    enhancement: number;
    timestamp: number;
};

export type UsedResources = {
    rings: {
        destroyed: number;
    };
    money: number;
    stones: {
        normal: number;
        advanced: number;
        premium: number;
    };
};