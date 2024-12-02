'use client';
import React, { useState } from 'react';
import { Ring, RingType, EnhanceLog, UsedResources } from '../types';
import {
  RING_NAMES,
  STAT_NAMES,
  BASE_STATS,
  ENHANCEMENT_STATS,
  ENHANCE_RATES,
  ENHANCEMENT_STONE_TYPES
} from '../constants';

export default function Home() {
  const [selectedRing, setSelectedRing] = useState<Ring | null>(null);
  const [enhanceLogs, setEnhanceLogs] = useState<EnhanceLog[]>([]);
  const [usedResources, setUsedResources] = useState<UsedResources>({
    rings: {
      destroyed: 0
    },
    money: 0,
    stones: {
      normal: 0,
      advanced: 0,
      premium: 0
    }
  });

  const selectRing = (type: RingType) => {
    const newRing: Ring = {
      id: `${type}_${Date.now()}`,
      type: type,
      enhancement: 0,
      stats: BASE_STATS[type]
    };
    setSelectedRing(newRing);
  };

  const handleEnhance = (stoneType: 'normal' | 'advanced' | 'premium') => {
    if (!selectedRing || selectedRing.enhancement >= 6) return;

    // 비용 처리
    setUsedResources(prev => ({
      ...prev,
      money: prev.money + ENHANCEMENT_STONE_TYPES[stoneType].cost,
      stones: {
        ...prev.stones,
        [stoneType]: prev.stones[stoneType] + 1
      }
    }));

    const roll = Math.random() * 100;
    const successRate = ENHANCE_RATES.success + ENHANCEMENT_STONE_TYPES[stoneType].successRate;

    if (roll < successRate) {
      // 성공
      const newEnhancement = selectedRing.enhancement + 1;
      setSelectedRing(prev => {
        if (!prev) return null;
        return {
          ...prev,
          enhancement: newEnhancement,
          stats: ENHANCEMENT_STATS[prev.type][newEnhancement] || prev.stats
        };
      });
      setEnhanceLogs(prev => [{
        type: 'success' as const,  // as const 추가
        ringType: selectedRing.type,
        enhancement: newEnhancement,
        timestamp: Date.now()
      }, ...prev].slice(0, 5));
    } else {

      setEnhanceLogs(prev => [{
        type: 'destroy' as const,  // as const 추가
        ringType: selectedRing.type,
        enhancement: selectedRing.enhancement,
        timestamp: Date.now()
    }, ...prev].slice(0, 5));
    
      setUsedResources(prev => ({
        ...prev,
        rings: {
          ...prev.rings,
          destroyed: prev.rings.destroyed + 1
        }
      }));
      setEnhanceLogs(prev => [{
        type: 'destroy',
        ringType: selectedRing.type,
        enhancement: selectedRing.enhancement,
        timestamp: Date.now()
      }, ...prev].slice(0, 5));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 p-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-8 text-center">코창서버 반지 강화 시뮬레이터</h1>

        {!selectedRing ? (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {Object.entries(RING_NAMES).map(([type, name]) => (
              <button
                key={type}
                onClick={() => selectRing(type as RingType)}
                className="bg-gray-800 rounded-xl p-6 border border-gray-700 hover:border-blue-500 transition-colors duration-200"
              >
                <h2 className="text-xl font-bold text-white">{name}</h2>
                <p className="text-gray-400">강화하기</p>
              </button>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-6">
              <div className="bg-gray-800 rounded-xl p-6 border border-gray-700 h-[600px]">
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-bold text-white">반지 정보</h2>
                  <button
                    onClick={() => setSelectedRing(null)}
                    className="text-gray-400 hover:text-white"
                  >
                    다른 반지 선택
                  </button>
                </div>
                <div className="mt-4">
                  <p className="text-lg font-semibold text-white">
                    +{selectedRing.enhancement} {RING_NAMES[selectedRing.type]}
                  </p>
                  <div className="border-t border-gray-700 pt-4 mt-4">
                    <p className="text-sm text-gray-500 mb-2">현재 스탯</p>
                    {Object.entries(selectedRing.stats).map(([stat, value]) => (
                      value > 0 && (
                        <p key={stat} className="text-gray-300">
                          {STAT_NAMES[stat]}: +{value}
                        </p>
                      )
                    ))}
                  </div>
                </div>
              </div>

              <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
                <h2 className="text-2xl font-bold text-white mb-4">강화</h2>
                <div className="grid grid-cols-3 gap-4">
                  <button
                    onClick={() => handleEnhance('normal')}
                    disabled={selectedRing.enhancement >= 6}
                    className={`${selectedRing.enhancement >= 6
                      ? 'bg-gray-600 cursor-not-allowed'
                      : 'bg-blue-600 hover:bg-blue-500'
                      } text-white rounded-lg py-2 px-4 transition-colors duration-200`}
                  >
                    강화석
                    <span className="block text-sm">(5,000원)</span>
                  </button>
                  <button
                    onClick={() => handleEnhance('advanced')}
                    disabled={selectedRing.enhancement >= 6}
                    className={`${selectedRing.enhancement >= 6
                      ? 'bg-gray-600 cursor-not-allowed'
                      : 'bg-green-600 hover:bg-green-500'
                      } text-white rounded-lg py-2 px-4 transition-colors duration-200`}
                  >
                    상급 강화석
                    <span className="block text-sm">(10,000원)</span>
                    <span className="block text-sm">+5%</span>
                  </button>
                  <button
                    onClick={() => handleEnhance('premium')}
                    disabled={selectedRing.enhancement >= 6}
                    className={`${selectedRing.enhancement >= 6
                      ? 'bg-gray-600 cursor-not-allowed'
                      : 'bg-purple-600 hover:bg-purple-500'
                      } text-white rounded-lg py-2 px-4 transition-colors duration-200`}
                  >
                    고급 강화석
                    <span className="block text-sm">(20,000원)</span>
                    <span className="block text-sm">+10%</span>
                  </button>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
                <h2 className="text-2xl font-bold text-white mb-4">강화 확률</h2>
                <div className="text-gray-300">
                  <p>기본 성공: {ENHANCE_RATES.success}%</p>
                  <p>파괴: {ENHANCE_RATES.destroy}%</p>
                </div>
              </div>

              <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
                <h2 className="text-2xl font-bold text-white mb-4">강화 로그</h2>
                <div className="space-y-2">
                  {enhanceLogs.map((log) => (
                    <div
                      key={log.timestamp}
                      className={`text-sm ${log.type === 'success' ? 'text-green-400' : 'text-red-400'
                        }`}
                    >
                      {log.type === 'success'
                        ? `${log.enhancement}강 강화 성공`
                        : `${log.enhancement}강 강화 실패 (파괴)`
                      }
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
                <h2 className="text-2xl font-bold text-white mb-4">사용된 재화</h2>
                <div className="space-y-2 text-gray-300">
                  <p>일반 강화석: {usedResources.stones.normal}개</p>
                  <p>상급 강화석: {usedResources.stones.advanced}개</p>
                  <p>고급 강화석: {usedResources.stones.premium}개</p>
                  <p>파괴된 반지: {usedResources.rings.destroyed}개</p>
                  <p>총 사용 금액: {usedResources.money.toLocaleString()}원</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}