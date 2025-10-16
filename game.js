/*
Due to character limit- actually its because of laggy device.
im moving the logic to here.
*/
// Game Data Structures
const UPGRADES = {
  hz: [
    { id: 1, name: 'Double Production', desc: 'Multiply Hz/s by 2 (softcapped at 100)', baseCost: 7, costMult: 2, effect: (level) => Decimal.pow(2, softcap(level, 100, 0.5)), color: 'yellow', icon: 'arrow-up' },
    { id: 2, name: 'Power Boost', desc: 'Multiply Hz/s by 1.25 (softcapped at 80)', baseCost: 100, costMult: 2.5, effect: (level) => Decimal.pow(1.25, softcap(level, 80, 0.6)), color: 'orange', icon: 'fire' },
    { id: 3, name: 'Frequency Surge', desc: 'Multiply Hz/s by 1.5 (softcapped at 60)', baseCost: 500, costMult: 3, effect: (level) => Decimal.pow(1.5, softcap(level, 60, 0.55)), color: 'red', icon: 'rocket' },
    { id: 4, name: 'Harmonic Resonance', desc: 'Multiply Hz/s by 2 (softcapped at 50)', baseCost: 2500, costMult: 4, effect: (level) => Decimal.pow(2, softcap(level, 50, 0.5)), color: 'green', icon: 'star' },
    { id: 5, name: 'Wave Amplifier', desc: 'Multiply Hz/s by 3 (softcapped at 40)', baseCost: 10000, costMult: 5, effect: (level) => Decimal.pow(3, softcap(level, 40, 0.45)), color: 'blue', icon: 'chart-line' },
    { id: 6, name: 'Sonic Overdrive', desc: 'Multiply Hz/s by 5 (softcapped at 30)', baseCost: 50000, costMult: 6, effect: (level) => Decimal.pow(5, softcap(level, 30, 0.4)), color: 'purple', icon: 'crown' }
  ],
  volume: [
    { id: 1, name: 'Volume Power', desc: 'Boost Volume effect by 1.5x', baseCost: 10, costMult: 5, color: 'purple', icon: 'plus-circle' },
    { id: 2, name: 'Volume Multiplier', desc: 'Double Volume gain on prestige', baseCost: 25, costMult: 10, color: 'purple', icon: 'gem' },
    { id: 3, name: 'Resonant Frequency', desc: 'Double Hz production directly', baseCost: 50, costMult: 20, color: 'purple', icon: 'bolt' },
    { id: 4, name: 'Compression', desc: 'Improve Hz upgrade efficiency', baseCost: 100, costMult: 50, color: 'purple', icon: 'compress-arrows-alt' },
    { id: 5, name: 'Logarithmic Scale', desc: 'Hz boost based on current Hz (log formula)', baseCost: 250, costMult: 100, color: 'purple', icon: 'infinity' },
    { id: 6, name: 'Perfect Pitch', desc: 'Unlock advanced resonance patterns', baseCost: 500, costMult: 250, color: 'purple', icon: 'magic' }
  ],
  speaker: [
    { id: 1, name: 'Speaker Amplification', desc: 'Double Speaker boost effect', baseCost: 5, costMult: 10, color: 'teal', icon: 'volume-up' },
    { id: 2, name: 'Volume Enhancement', desc: 'Boost Volume gain by 1.5x', baseCost: 10, costMult: 25, color: 'teal', icon: 'layer-group' },
    { id: 3, name: 'Triple Hz Power', desc: 'Multiply Hz/s by 3 directly', baseCost: 20, costMult: 50, color: 'teal', icon: 'tachometer-alt' },
    { id: 4, name: 'Feedback Loop', desc: 'Volume gain scales with Speakers', baseCost: 50, costMult: 100, color: 'teal', icon: 'sync-alt' },
    { id: 5, name: 'Volume Synergy', desc: 'Hz boost based on Volume amount', baseCost: 100, costMult: 200, color: 'teal', icon: 'atom' },
    { id: 6, name: 'Efficient Prestige', desc: 'Double Speaker gain on prestige', baseCost: 250, costMult: 500, color: 'teal', icon: 'recycle' },
    { id: 7, name: 'Megaphone', desc: 'Multiply Hz/s by 10 (MEGA BOOST!)', baseCost: 1000, costMult: 1000, color: 'teal', icon: 'star' }
  ],
  infinity: [
    { id: 1, name: "Nal's Blessing", desc: 'Multiply Hz/s by 10', baseCost: 1, costMult: 5, color: 'pink', icon: 'rocket' },
    { id: 2, name: 'Volume Acceleration', desc: 'Multiply Volume gain by 5', baseCost: 2, costMult: 10, color: 'pink', icon: 'volume-up' },
    { id: 3, name: 'Self-Synergy', desc: 'Hz boost based on Infinity (^0.5 per level)', baseCost: 3, costMult: 15, color: 'pink', icon: 'infinity' },
    { id: 4, name: 'Speaker Boost', desc: 'Multiply Speaker gain by 10', baseCost: 4, costMult: 20, color: 'pink', icon: 'broadcast-tower' },
    { id: 5, name: 'Cross-Layer', desc: 'Hz boost based on Speakers (log formula)', baseCost: 5, costMult: 25, color: 'pink', icon: 'layer-group' },
    { id: 6, name: 'Volume Compression', desc: 'Volume gain scales with Infinity', baseCost: 6, costMult: 30, color: 'pink', icon: 'compress' },
    { id: 7, name: 'Hz Scaling', desc: 'Hz boost based on current Hz (log^0.5)', baseCost: 7, costMult: 35, color: 'pink', icon: 'chart-line' },
    { id: 8, name: 'Speaker Synergy', desc: 'Speaker gain scales with Infinity (^0.75)', baseCost: 8, costMult: 40, color: 'pink', icon: 'users' },
    { id: 9, name: 'Reality Warp', desc: 'Multiply Hz/s by 100 (INSANE!)', baseCost: 9, costMult: 45, color: 'pink', icon: 'fire' },
    { id: 10, name: 'Volume Meteor', desc: 'Multiply Volume gain by 50', baseCost: 10, costMult: 50, color: 'pink', icon: 'meteor' },
    { id: 11, name: 'Perfect Harmony', desc: 'Hz boost from Volume × Speakers (^0.2)', baseCost: 11, costMult: 55, color: 'pink', icon: 'atom' },
    { id: 12, name: 'Speaker Storm', desc: 'Multiply Speaker gain by 25', baseCost: 12, costMult: 60, color: 'pink', icon: 'asterisk' },
    { id: 13, name: "Nal's Gift", desc: 'Multiply Hz/s by 1000 (GODLIKE!)', baseCost: 13, costMult: 65, color: 'pink', icon: 'crown' },
    { id: 14, name: 'Eternal Loop', desc: 'Double Infinity gain on collapse', baseCost: 14, costMult: 70, color: 'pink', icon: 'redo' },
    { id: 15, name: 'Passive Infinity', desc: 'Generate 0.01 Infinity/s per level', baseCost: 15, costMult: 75, color: 'pink', icon: 'clock' }
  ],
  eternity: [
    { id: 1, name: 'Eternity Begins', desc: 'Multiply ALL gains by 10', baseCost: 1, costMult: 10, color: 'green', icon: 'seedling' },
    { id: 2, name: 'Infinite Power', desc: 'Infinity gain × 100', baseCost: 2, costMult: 25, color: 'green', icon: 'bolt' },
    { id: 3, name: 'Eternal Boost', desc: 'Hz/s × (Eternity + 1)^5', baseCost: 3, costMult: 50, color: 'green', icon: 'rocket' },
    { id: 4, name: 'Time Dilation', desc: 'All prestige gains × 1000', baseCost: 5, costMult: 100, color: 'green', icon: 'hourglass-half' },
    { id: 5, name: 'Recursive Eternity', desc: 'Eternity boosts itself', baseCost: 10, costMult: 250, color: 'green', icon: 'sync-alt' },
    { id: 6, name: 'Machine Overload', desc: 'Machines × 10000', baseCost: 15, costMult: 500, color: 'green', icon: 'cogs' },
    { id: 7, name: 'Ultimate Synergy', desc: 'All layers multiply each other', baseCost: 25, costMult: 1000, color: 'green', icon: 'star' },
    { id: 8, name: 'Godly Presence', desc: 'Hz/s × 1e10', baseCost: 50, costMult: 2500, color: 'green', icon: 'crown' },
    { id: 9, name: 'Infinity Squared', desc: 'Infinity effects × (Infinity^0.5)', baseCost: 100, costMult: 5000, color: 'green', icon: 'square-root-alt' },
    { id: 10, name: 'Eternal Machines', desc: 'Machines boost Eternity gain', baseCost: 250, costMult: 10000, color: 'green', icon: 'industry' },
    { id: 11, name: 'Time Compression', desc: 'All upgrades 50% cheaper', baseCost: 500, costMult: 25000, color: 'green', icon: 'compress' },
    { id: 12, name: 'Hyper Infinity', desc: 'Passive Infinity × 1000', baseCost: 1000, costMult: 50000, color: 'green', icon: 'infinity' },
    { id: 13, name: 'Reality Break', desc: 'Hz/s × 1e50', baseCost: 2500, costMult: 100000, color: 'green', icon: 'bomb' },
    { id: 14, name: 'Omnipotence', desc: 'All effects × 1e100', baseCost: 5000, costMult: 250000, color: 'green', icon: 'fist-raised' },
    { id: 15, name: 'Eternal Recursion', desc: 'Eternity × log10(Eternity + 10)', baseCost: 10000, costMult: 500000, color: 'green', icon: 'redo-alt' },
    { id: 16, name: 'Transcendence', desc: 'Bypass all softcaps by 50%', baseCost: 25000, costMult: 1000000, color: 'green', icon: 'arrow-up' },
    { id: 17, name: 'Dimensional Shift', desc: 'All gains × 1e200', baseCost: 50000, costMult: 2500000, color: 'green', icon: 'cube' },
    { id: 18, name: 'Absolute Power', desc: 'Eternity gain × (Eternity + 1)', baseCost: 100000, costMult: 5000000, color: 'green', icon: 'fire-alt' },
    { id: 19, name: 'Eternal Omniscience', desc: 'All resources × 1e500', baseCost: 250000, costMult: 10000000, color: 'green', icon: 'eye' },
    { id: 20, name: 'The End of Time', desc: 'Passive Eternity generation (0.001/s per level)', baseCost: 1000000, costMult: 100000000, color: 'green', icon: 'skull-crossbones' }
  ]
};

// Game State
let gameState = {
  hz: new Decimal(0),
  hzPerSec: new Decimal(1),
  
  // Upgrade levels and costs
  hzUpgrades: {},
  volumeUpgrades: {},
  speakerUpgrades: {},
  infinityUpgrades: {},
  eternityUpgrades: {},
  
  // Prestige layers
  volume: new Decimal(0),
  volumeUnlocked: false,
  speakers: new Decimal(0),
  speakersUnlocked: false,
  infinity: new Decimal(0),
  infinityUnlocked: false,
  infinityReq: new Decimal("1e308"),
  infinityTimes: new Decimal(0),
  eternity: new Decimal(0),
  eternityUnlocked: false,
  eternityReq: new Decimal("1e308"),
  eternityTimes: new Decimal(0),
  
  // Machines
  machinesUnlocked: false,
  
  // Dialogues shown
  infinityDialogueShown: false,
  eternityDialogueShown: false,
  
  // Achievements
  achievements: {
    ach1: false,
    ach2: false,
    ach3: false,
    ach4: false,
    ach5: false,
    ach6: false,
    ach7: false,
    ach8: false,
    ach9: false,
  },
  
  // Settings
  theme: 'black',
};

// Initialize upgrades
UPGRADES.hz.forEach(u => {
  gameState.hzUpgrades[u.id] = { level: new Decimal(0), cost: new Decimal(u.baseCost) };
});
UPGRADES.volume.forEach(u => {
  gameState.volumeUpgrades[u.id] = { level: new Decimal(0), cost: new Decimal(u.baseCost) };
});
UPGRADES.speaker.forEach(u => {
  gameState.speakerUpgrades[u.id] = { level: new Decimal(0), cost: new Decimal(u.baseCost) };
});
UPGRADES.infinity.forEach(u => {
  gameState.infinityUpgrades[u.id] = { level: new Decimal(0), cost: new Decimal(u.baseCost) };
});
UPGRADES.eternity.forEach(u => {
  gameState.eternityUpgrades[u.id] = { level: new Decimal(0), cost: new Decimal(u.baseCost) };
});

// Utility Functions
function softcap(value, start, power) {
  value = new Decimal(value);
  start = new Decimal(start);
  if (value.lte(start)) return value;
  return value.div(start).pow(power).times(start);
}

function formatNumber(num, decimals = 2) {
  num = new Decimal(num);
  if (num.lt(1000)) return num.toFixed(0);
  if (num.lt(1000000)) return num.toFixed(decimals);
  
  if (num.lt("1e9")) {
    const abbrev = ['', 'K', 'M', 'B'];
    const exp = Math.floor(num.e / 3);
    const mantissa = num.div(Decimal.pow(10, exp * 3));
    return mantissa.toFixed(decimals) + abbrev[exp];
  }
  
  // XeYeZ notation for very large numbers
  if (num.e >= 1000) {
    const exponent = num.e;
    const innerExp = Math.floor(Math.log10(exponent));
    const innerMantissa = exponent / Math.pow(10, innerExp);
    const outerMantissa = num.mantissa.toFixed(2);
    return `${outerMantissa}e${innerMantissa.toFixed(2)}e${innerExp}`;
  }
  
  return num.mantissa.toFixed(2) + 'e' + num.e;
}

// Nerf Multipliers
function getVolumeNerfMultiplier() {
  let mult = new Decimal(1);
  const vol = gameState.volume;
  
  if (vol.gte(1000)) mult = mult.times(0.5);
  if (vol.gte(10000)) mult = mult.times(0.25);
  if (vol.gte(100000)) mult = mult.times(0.1);
  if (vol.gte(1000000)) mult = mult.times(0.05);
  if (vol.gte(10000000)) mult = mult.times(0.01);
  
  return mult;
}

function getSpeakerNerfMultiplier() {
  let mult = new Decimal(1);
  const spk = gameState.speakers;
  
  if (spk.gte(100)) mult = mult.times(0.5);
  if (spk.gte(500)) mult = mult.times(0.3);
  if (spk.gte(2000)) mult = mult.times(0.15);
  if (spk.gte(10000)) mult = mult.times(0.05);
  if (spk.gte(50000)) mult = mult.times(0.01);
  
  return mult;
}

// Machine Boost
function getMachineBoost() {
  if (!gameState.machinesUnlocked) return new Decimal(1);
  
  const inf = gameState.infinity;
  let boost = new Decimal(1);
  
  if (inf.gte(1e6)) boost = boost.times(Decimal.pow(2, inf.div(1e6).log10().plus(1)));
  if (inf.gte(1e9)) boost = boost.times(Decimal.pow(3, inf.div(1e9).log10().plus(1)));
  if (inf.gte(1e12)) boost = boost.times(Decimal.pow(5, inf.div(1e12).log10().plus(1)));
  if (inf.gte(1e15)) boost = boost.times(Decimal.pow(10, inf.div(1e15).log10().plus(1)));
  if (inf.gte(1e20)) boost = boost.times(Decimal.pow(25, inf.div(1e20).log10().plus(1)));
  if (inf.gte(1e30)) boost = boost.times(Decimal.pow(100, inf.div(1e30).log10().plus(1)));
  if (inf.gte(1e40)) boost = boost.times(Decimal.pow(1000, inf.div(1e40).log10().plus(1)));
  if (inf.gte(1e60)) boost = boost.times(Decimal.pow(10000, inf.div(1e60).log10().plus(1)));
  if (inf.gte(1e80)) boost = boost.times(Decimal.pow(100000, inf.div(1e80).log10().plus(1)));
  if (inf.gte(1e100)) boost = boost.times(Decimal.pow(1000000, inf.div(1e100).log10().plus(1)));
  
  return boost;
}

// Eternity Boost
function getEternityBoost() {
  if (!gameState.eternityUnlocked) return new Decimal(1);
  
  let boost = gameState.eternity.plus(1).pow(10);
  
  // Eternity upgrades
  if (gameState.eternityUpgrades[1].level.gt(0)) {
    boost = boost.times(Decimal.pow(10, gameState.eternityUpgrades[1].level));
  }
  if (gameState.eternityUpgrades[3].level.gt(0)) {
    boost = boost.times(gameState.eternity.plus(1).pow(gameState.eternityUpgrades[3].level.times(5)));
  }
  if (gameState.eternityUpgrades[5].level.gt(0)) {
    boost = boost.times(gameState.eternity.plus(1).pow(gameState.eternityUpgrades[5].level));
  }
  if (gameState.eternityUpgrades[8].level.gt(0)) {
    boost = boost.times(Decimal.pow(1e10, gameState.eternityUpgrades[8].level));
  }
  if (gameState.eternityUpgrades[13].level.gt(0)) {
    boost = boost.times(Decimal.pow("1e50", gameState.eternityUpgrades[13].level));
  }
  if (gameState.eternityUpgrades[14].level.gt(0)) {
    boost = boost.times(Decimal.pow("1e100", gameState.eternityUpgrades[14].level));
  }
  if (gameState.eternityUpgrades[17].level.gt(0)) {
    boost = boost.times(Decimal.pow("1e200", gameState.eternityUpgrades[17].level));
  }
  if (gameState.eternityUpgrades[19].level.gt(0)) {
    boost = boost.times(Decimal.pow("1e500", gameState.eternityUpgrades[19].level));
  }
  
  return boost;
}

// Calculate Hz/s
function calculateHzPerSec() {
  let base = new Decimal(1);
  
  // Hz upgrades
  UPGRADES.hz.forEach(u => {
    const level = gameState.hzUpgrades[u.id].level;
    if (level.gt(0)) {
      base = base.times(u.effect(level));
    }
  });
  
  // Volume boost
  if (gameState.volumeUnlocked) {
    let volumeBoost = gameState.volume.plus(1).pow(0.8);
    
    if (gameState.volumeUpgrades[1].level.gt(0)) {
      volumeBoost = volumeBoost.times(Decimal.pow(1.5, softcap(gameState.volumeUpgrades[1].level, 20, 0.5)));
    }
    if (gameState.volumeUpgrades[3].level.gt(0)) {
      base = base.times(Decimal.pow(2, softcap(gameState.volumeUpgrades[3].level, 15, 0.5)));
    }
    if (gameState.volumeUpgrades[5].level.gt(0)) {
      base = base.times(gameState.hz.plus(1).log10().plus(1).pow(gameState.volumeUpgrades[5].level.times(0.05)));
    }
    
    base = base.times(volumeBoost);
  }
  
  // Speaker boost
  if (gameState.speakersUnlocked) {
    let speakerBoost = gameState.speakers.plus(1).pow(1.5);
    
    if (gameState.speakerUpgrades[1].level.gt(0)) {
      speakerBoost = speakerBoost.times(Decimal.pow(2, softcap(gameState.speakerUpgrades[1].level, 10, 0.5)));
    }
    if (gameState.speakerUpgrades[3].level.gt(0)) {
      base = base.times(Decimal.pow(3, softcap(gameState.speakerUpgrades[3].level, 8, 0.5)));
    }
    if (gameState.speakerUpgrades[5].level.gt(0)) {
      base = base.times(gameState.volume.plus(1).pow(gameState.speakerUpgrades[5].level.times(0.3)));
    }
    if (gameState.speakerUpgrades[7].level.gt(0)) {
      base = base.times(Decimal.pow(10, softcap(gameState.speakerUpgrades[7].level, 5, 0.4)));
    }
    
    base = base.times(speakerBoost);
  }
  
  // Infinity boost
  if (gameState.infinityUnlocked) {
    let infinityBoost = gameState.infinity.plus(1).pow(3);
    
    if (gameState.infinityUpgrades[1].level.gt(0)) {
      base = base.times(Decimal.pow(10, gameState.infinityUpgrades[1].level));
    }
    if (gameState.infinityUpgrades[3].level.gt(0)) {
      base = base.times(gameState.infinity.plus(1).pow(gameState.infinityUpgrades[3].level.times(0.5)));
    }
    if (gameState.infinityUpgrades[5].level.gt(0)) {
      base = base.times(Decimal.pow(2, gameState.infinityUpgrades[5].level.times(gameState.speakers.plus(1).log10())));
    }
    if (gameState.infinityUpgrades[7].level.gt(0)) {
      base = base.times(gameState.hz.plus(10).log10().pow(gameState.infinityUpgrades[7].level.times(0.5)));
    }
    if (gameState.infinityUpgrades[9].level.gt(0)) {
      base = base.times(Decimal.pow(100, gameState.infinityUpgrades[9].level));
    }
    if (gameState.infinityUpgrades[11].level.gt(0)) {
      base = base.times(gameState.volume.plus(1).times(gameState.speakers.plus(1)).pow(gameState.infinityUpgrades[11].level.times(0.2)));
    }
    if (gameState.infinityUpgrades[13].level.gt(0)) {
      base = base.times(Decimal.pow(1000, gameState.infinityUpgrades[13].level));
    }
    
    base = base.times(infinityBoost);
  }
  
  // Machine boost
  base = base.times(getMachineBoost());
  
  // Eternity boost
  base = base.times(getEternityBoost());
  
  // Final softcap
  if (base.gte("1e100")) {
    base = softcap(base, new Decimal("1e100"), 0.75);
  }
  
  return base;
}

// Calculate Volume Gain
function calculateVolumeGain() {
  let base = gameState.hz.div(1000000).pow(0.4).floor();
  
  if (gameState.volumeUpgrades[2].level.gt(0)) {
    base = base.times(Decimal.pow(2, softcap(gameState.volumeUpgrades[2].level, 10, 0.5)));
  }
  
  if (gameState.speakerUpgrades[2].level.gt(0)) {
    base = base.times(Decimal.pow(1.5, softcap(gameState.speakerUpgrades[2].level, 8, 0.5)));
  }
  
  if (gameState.speakerUpgrades[4].level.gt(0)) {
    base = base.times(gameState.speakers.plus(1).pow(gameState.speakerUpgrades[4].level.times(0.5)));
  }
  
  if (gameState.infinityUpgrades[2].level.gt(0)) {
    base = base.times(Decimal.pow(5, gameState.infinityUpgrades[2].level));
  }
  if (gameState.infinityUpgrades[6].level.gt(0)) {
    base = base.times(gameState.infinity.plus(1).pow(gameState.infinityUpgrades[6].level));
  }
  if (gameState.infinityUpgrades[10].level.gt(0)) {
    base = base.times(Decimal.pow(50, gameState.infinityUpgrades[10].level));
  }
  
  if (gameState.eternityUpgrades[4].level.gt(0)) {
    base = base.times(Decimal.pow(1000, gameState.eternityUpgrades[4].level));
  }
  
  base = base.times(getMachineBoost());
  base = base.times(getEternityBoost());
  base = base.times(getVolumeNerfMultiplier());
  
  return base.floor();
}

// Calculate Speaker Gain
function calculateSpeakerGain() {
  let base = gameState.volume.div(100).pow(0.35).floor();
  
  if (gameState.speakerUpgrades[6].level.gt(0)) {
    base = base.times(Decimal.pow(2, softcap(gameState.speakerUpgrades[6].level, 6, 0.5)));
  }
  
  if (gameState.infinityUpgrades[4].level.gt(0)) {
    base = base.times(Decimal.pow(10, gameState.infinityUpgrades[4].level));
  }
  if (gameState.infinityUpgrades[8].level.gt(0)) {
    base = base.times(gameState.infinity.plus(1).pow(gameState.infinityUpgrades[8].level.times(0.75)));
  }
  if (gameState.infinityUpgrades[12].level.gt(0)) {
    base = base.times(Decimal.pow(25, gameState.infinityUpgrades[12].level));
  }
  
  if (gameState.eternityUpgrades[4].level.gt(0)) {
    base = base.times(Decimal.pow(1000, gameState.eternityUpgrades[4].level));
  }
  
  base = base.times(getMachineBoost());
  base = base.times(getEternityBoost());
  base = base.times(getSpeakerNerfMultiplier());
  
  return base.floor();
}

// Calculate Infinity Gain
function calculateInfinityGain() {
  if (gameState.hz.lt(gameState.infinityReq)) return new Decimal(0);
  
  let base = gameState.hz.log10().div(gameState.infinityReq.log10()).pow(0.5).floor();
  
  if (gameState.infinityUpgrades[14].level.gt(0)) {
    base = base.times(Decimal.pow(2, gameState.infinityUpgrades[14].level));
  }
  
  if (gameState.eternityUpgrades[2].level.gt(0)) {
    base = base.times(Decimal.pow(100, gameState.eternityUpgrades[2].level));
  }
  if (gameState.eternityUpgrades[9].level.gt(0)) {
    base = base.times(gameState.infinity.plus(1).pow(gameState.infinityUpgrades[9].level.times(0.5)));
  }
  
  base = base.times(getMachineBoost());
  base = base.times(getEternityBoost());
  
  return base.floor().max(1);
}

// Calculate Eternity Gain
function calculateEternityGain() {
  if (gameState.infinity.lt(gameState.eternityReq)) return new Decimal(0);
  
  let base = gameState.infinity.log10().div(gameState.eternityReq.log10()).pow(0.4).floor();
  
  if (gameState.eternityUpgrades[10].level.gt(0)) {
    base = base.times(getMachineBoost().log10().plus(1));
  }
  if (gameState.eternityUpgrades[18].level.gt(0)) {
    base = base.times(gameState.eternity.plus(1).pow(gameState.eternityUpgrades[18].level));
  }
  
  return base.floor().max(1);
}

// Render Upgrades
function renderUpgrades() {
  // Hz Upgrades
  const hzContainer = document.getElementById('hz-upgrades-container');
  hzContainer.innerHTML = '';
  UPGRADES.hz.forEach(upgrade => {
    const data = gameState.hzUpgrades[upgrade.id];
    const card = createUpgradeCard(upgrade, data, 'hz', gameState.hz);
    hzContainer.appendChild(card);
  });
  
  // Volume Upgrades
  const volumeContainer = document.getElementById('volume-upgrades-container');
  volumeContainer.innerHTML = '';
  UPGRADES.volume.forEach(upgrade => {
    const data = gameState.volumeUpgrades[upgrade.id];
    const card = createUpgradeCard(upgrade, data, 'volume', gameState.volume);
    volumeContainer.appendChild(card);
  });
  
  // Speaker Upgrades
  const speakerContainer = document.getElementById('speaker-upgrades-container');
  speakerContainer.innerHTML = '';
  UPGRADES.speaker.forEach(upgrade => {
    const data = gameState.speakerUpgrades[upgrade.id];
    const card = createUpgradeCard(upgrade, data, 'speaker', gameState.speakers);
    speakerContainer.appendChild(card);
  });
  
  // Infinity Upgrades
  const infinityContainer = document.getElementById('infinity-upgrades-container');
  infinityContainer.innerHTML = '';
  UPGRADES.infinity.forEach(upgrade => {
    const data = gameState.infinityUpgrades[upgrade.id];
    const card = createUpgradeCard(upgrade, data, 'infinity', gameState.infinity);
    infinityContainer.appendChild(card);
  });
  
  // Eternity Upgrades
  const eternityContainer = document.getElementById('eternity-upgrades-container');
  eternityContainer.innerHTML = '';
  UPGRADES.eternity.forEach(upgrade => {
    const data = gameState.eternityUpgrades[upgrade.id];
    const card = createUpgradeCard(upgrade, data, 'eternity', gameState.eternity);
    eternityContainer.appendChild(card);
  });
}

function createUpgradeCard(upgrade, data, type, currency) {
  const card = document.createElement('div');
  card.className = `upgrade-card border-${upgrade.color}-400`;
  
  const canBuy = currency.gte(data.cost);
  
  card.innerHTML = `
    <div class="text-2xl font-bold mb-2 text-primary"><i class="fas fa-${upgrade.icon}"></i> ${upgrade.name}</div>
    <div class="text-sm mb-3 text-secondary">${upgrade.desc}</div>
    <div class="flex justify-between items-center">
      <div>
        <div class="text-lg text-secondary">Cost: <span class="text-${upgrade.color}-400">${formatNumber(data.cost)}</span></div>
        <div class="text-sm text-secondary">Level: ${formatNumber(data.level)}</div>
      </div>
      <div class="flex space-x-2">
        <button class="upgrade-btn border-${upgrade.color}-400 text-${upgrade.color}-400 ${!canBuy ? 'opacity-50 cursor-not-allowed' : ''}" 
                onclick="buyUpgrade('${type}', ${upgrade.id})" ${!canBuy ? 'disabled' : ''}>BUY</button>
        <button class="upgrade-btn border-${upgrade.color}-400 text-${upgrade.color}-400 ${!canBuy ? 'opacity-50 cursor-not-allowed' : ''}" 
                onclick="buyMaxUpgrade('${type}', ${upgrade.id})" ${!canBuy ? 'disabled' : ''}>MAX</button>
      </div>
    </div>
  `;
  
  return card;
}

// Buy Upgrade
function buyUpgrade(type, id) {
  const upgradeData = UPGRADES[type].find(u => u.id === id);
  const stateKey = type + 'Upgrades';
  const data = gameState[stateKey][id];
  
  let currency;
  if (type === 'hz') currency = gameState.hz;
  else if (type === 'volume') currency = gameState.volume;
  else if (type === 'speaker') currency = gameState.speakers;
  else if (type === 'infinity') currency = gameState.infinity;
  else if (type === 'eternity') currency = gameState.eternity;
  
  if (currency.gte(data.cost)) {
    if (type === 'hz') gameState.hz = gameState.hz.minus(data.cost);
    else if (type === 'volume') gameState.volume = gameState.volume.minus(data.cost);
    else if (type === 'speaker') gameState.speakers = gameState.speakers.minus(data.cost);
    else if (type === 'infinity') gameState.infinity = gameState.infinity.minus(data.cost);
    else if (type === 'eternity') gameState.eternity = gameState.eternity.minus(data.cost);
    
    data.level = data.level.plus(1);
    data.cost = new Decimal(upgradeData.baseCost).times(Decimal.pow(upgradeData.costMult, data.level));
    
    updateDisplay();
  }
}

// Buy Max Upgrade
function buyMaxUpgrade(type, id) {
  const upgradeData = UPGRADES[type].find(u => u.id === id);
  const stateKey = type + 'Upgrades';
  const data = gameState[stateKey][id];
  
  let currency;
  if (type === 'hz') currency = gameState.hz;
  else if (type === 'volume') currency = gameState.volume;
  else if (type === 'speaker') currency = gameState.speakers;
  else if (type === 'infinity') currency = gameState.infinity;
  else if (type === 'eternity') currency = gameState.eternity;
  
  let bought = 0;
  while (currency.gte(data.cost) && bought < 10000) {
    if (type === 'hz') gameState.hz = gameState.hz.minus(data.cost);
    else if (type === 'volume') gameState.volume = gameState.volume.minus(data.cost);
    else if (type === 'speaker') gameState.speakers = gameState.speakers.minus(data.cost);
    else if (type === 'infinity') gameState.infinity = gameState.infinity.minus(data.cost);
    else if (type === 'eternity') gameState.eternity = gameState.eternity.minus(data.cost);
    
    data.level = data.level.plus(1);
    data.cost = new Decimal(upgradeData.baseCost).times(Decimal.pow(upgradeData.costMult, data.level));
    bought++;
    
    // Update currency reference
    if (type === 'hz') currency = gameState.hz;
    else if (type === 'volume') currency = gameState.volume;
    else if (type === 'speaker') currency = gameState.speakers;
    else if (type === 'infinity') currency = gameState.infinity;
    else if (type === 'eternity') currency = gameState.eternity;
  }
  
  if (bought > 0) updateDisplay();
}

// Prestige Functions
function prestigeVolume() {
  const gain = calculateVolumeGain();
  if (gain.gte(1) || (!gameState.volumeUnlocked && gameState.hz.gte(1000000))) {
    gameState.volume = gameState.volume.plus(gain);
    gameState.volumeUnlocked = true;
    
    // Reset Hz
    gameState.hz = new Decimal(0);
    UPGRADES.hz.forEach(u => {
      gameState.hzUpgrades[u.id] = { level: new Decimal(0), cost: new Decimal(u.baseCost) };
    });
    
    showPopup(`Prestiged! +${formatNumber(gain)} Volume`, 'achievement');
    updateDisplay();
  }
}

function prestigeSpeaker() {
  const gain = calculateSpeakerGain();
  if (gain.gte(1) || (!gameState.speakersUnlocked && gameState.volume.gte(100))) {
    gameState.speakers = gameState.speakers.plus(gain);
    gameState.speakersUnlocked = true;
    
    // Reset Volume & Hz
    gameState.volume = new Decimal(0);
    UPGRADES.volume.forEach(u => {
      gameState.volumeUpgrades[u.id] = { level: new Decimal(0), cost: new Decimal(u.baseCost) };
    });
    
    gameState.hz = new Decimal(0);
    UPGRADES.hz.forEach(u => {
      gameState.hzUpgrades[u.id] = { level: new Decimal(0), cost: new Decimal(u.baseCost) };
    });
    
    showPopup(`Mega Prestige! +${formatNumber(gain)} Speakers`, 'achievement');
    updateDisplay();
  }
}

function doInfinity() {
  const gain = calculateInfinityGain();
  if (gain.lt(1) && gameState.infinityUnlocked) return;
  
  gameState.infinity = gameState.infinity.plus(gain.max(1));
  gameState.infinityUnlocked = true;
  gameState.infinityTimes = gameState.infinityTimes.plus(1);
  
  // Update requirement
  const reqIncrease = Decimal.pow(10, Decimal.pow(2, gameState.infinityTimes));
  gameState.infinityReq = gameState.infinityReq.times(reqIncrease);
  
  // Full reset
  resetToInfinity();
  
  showPopup(`Reality Collapsed! +${formatNumber(gain.max(1))} Infinity`, 'achievement');
  updateDisplay();
}

function bulkInfinitize() {
  let totalGain = new Decimal(0);
  let count = 0;
  
  while (gameState.hz.gte(gameState.infinityReq) && count < 10000) {
    const gain = calculateInfinityGain();
    totalGain = totalGain.plus(gain);
    
    const reqIncrease = Decimal.pow(10, Decimal.pow(2, gameState.infinityTimes.plus(count + 1)));
    const newReq = gameState.infinityReq.times(reqIncrease);
    
    if (gameState.hz.lt(newReq)) break;
    
    gameState.infinityReq = newReq;
    gameState.infinityTimes = gameState.infinityTimes.plus(1);
    count++;
  }
  
  if (totalGain.gt(0)) {
    gameState.infinity = gameState.infinity.plus(totalGain);
    resetToInfinity();
    showPopup(`Bulk Infinitized! +${formatNumber(totalGain)} Infinity (${count} times)`, 'achievement');
    updateDisplay();
  }
}

function doEternity() {
  const gain = calculateEternityGain();
  if (gain.lt(1) && gameState.eternityUnlocked) return;
  
  gameState.eternity = gameState.eternity.plus(gain.max(1));
  gameState.eternityUnlocked = true;
  gameState.eternityTimes = gameState.eternityTimes.plus(1);
  
  // Update requirement
  const reqIncrease = Decimal.pow(10, Decimal.pow(3, gameState.eternityTimes));
  gameState.eternityReq = gameState.eternityReq.times(reqIncrease);
  
  // Full reset
  resetToEternity();
  
  showPopup(`Eternitized! +${formatNumber(gain.max(1))} Eternity`, 'achievement');
  updateDisplay();
}

function bulkEternitize() {
  let totalGain = new Decimal(0);
  let count = 0;
  
  while (gameState.infinity.gte(gameState.eternityReq) && count < 10000) {
    const gain = calculateEternityGain();
    totalGain = totalGain.plus(gain);
    
    const reqIncrease = Decimal.pow(10, Decimal.pow(3, gameState.eternityTimes.plus(count + 1)));
    const newReq = gameState.eternityReq.times(reqIncrease);
    
    if (gameState.infinity.lt(newReq)) break;
    
    gameState.eternityReq = newReq;
    gameState.eternityTimes = gameState.eternityTimes.plus(1);
    count++;
  }
  
  if (totalGain.gt(0)) {
    gameState.eternity = gameState.eternity.plus(totalGain);
    resetToEternity();
    showPopup(`Bulk Eternitized! +${formatNumber(totalGain)} Eternity (${count} times)`, 'achievement');
    updateDisplay();
  }
}

function resetToInfinity() {
  gameState.hz = new Decimal(0);
  gameState.volume = new Decimal(0);
  gameState.speakers = new Decimal(0);
  
  UPGRADES.hz.forEach(u => {
    gameState.hzUpgrades[u.id] = { level: new Decimal(0), cost: new Decimal(u.baseCost) };
  });
  UPGRADES.volume.forEach(u => {
    gameState.volumeUpgrades[u.id] = { level: new Decimal(0), cost: new Decimal(u.baseCost) };
  });
  UPGRADES.speaker.forEach(u => {
    gameState.speakerUpgrades[u.id] = { level: new Decimal(0), cost: new Decimal(u.baseCost) };
  });
}

function resetToEternity() {
  gameState.infinity = new Decimal(0);
  gameState.infinityReq = new Decimal("1e308");
  gameState.infinityTimes = new Decimal(0);
  
  UPGRADES.infinity.forEach(u => {
    gameState.infinityUpgrades[u.id] = { level: new Decimal(0), cost: new Decimal(u.baseCost) };
  });
  
  resetToInfinity();
}

// Typing effect
function typeWriter(element, text, speed, callback) {
  let i = 0;
  element.textContent = '';
  
  function type() {
    if (i < text.length) {
      element.textContent += text.charAt(i);
      i++;
      setTimeout(type, speed);
    } else if (callback) {
      callback();
    }
  }
  type();
}

// Trigger Infinity Dialogue
function triggerInfinity() {
  if (gameState.infinityDialogueShown) return;
  
  const popup = document.getElementById('popup-infinity');
  const typingText = document.getElementById('typing-text');
  const okBtn = document.getElementById('infinity-ok-btn');
  
  okBtn.classList.add('hidden');
  popup.classList.add('visible');
  
  const message = "The Reality has collapsed due to so much hertz being made, the infinite being named 'Nal' has reset you for faster progression.";
  
  typeWriter(typingText, message, 1000/12, () => {
    okBtn.classList.remove('hidden');
  });
  
  gameState.infinityDialogueShown = true;
}

// Trigger Eternity Dialogue
function triggerEternity() {
  if (gameState.eternityDialogueShown) return;
  
  const popup = document.getElementById('popup-eternity');
  const typingText = document.getElementById('typing-text-eternity');
  const okBtn = document.getElementById('eternity-ok-btn');
  
  okBtn.classList.add('hidden');
  popup.classList.add('visible');
  
  const gain = calculateEternityGain();
  const message = `Due to so much infinities being made, The Infinities collapsed into ${formatNumber(gain.max(1))} Eternities. You can have extreme upgrades to boost your progression even more.`;
  
  typeWriter(typingText, message, 1000/12, () => {
    okBtn.classList.remove('hidden');
  });
  
  gameState.eternityDialogueShown = true;
}

// Accept dialogues
function acceptInfinity() {
  doInfinity();
  document.getElementById('popup-infinity').classList.remove('visible');
}

function acceptEternity() {
  doEternity();
  document.getElementById('popup-eternity').classList.remove('visible');
}

// Update Machines
function updateMachines() {
  const inf = gameState.infinity;
  const machines = [
    { id: 'red', req: new Decimal(1e6) },
    { id: 'orange', req: new Decimal(1e9) },
    { id: 'yellow', req: new Decimal(1e12) },
    { id: 'green', req: new Decimal(1e15) },
    { id: 'blue', req: new Decimal(1e20) },
    { id: 'purple', req: new Decimal(1e30) },
    { id: 'pink', req: new Decimal(1e40) },
    { id: 'brown', req: new Decimal(1e60) },
    { id: 'rainbow', req: new Decimal(1e80) },
    { id: 'monochrome', req: new Decimal(1e100) }
  ];
  
  machines.forEach(machine => {
    const el = document.getElementById(`machine-${machine.id}`);
    if (inf.gte(machine.req)) {
      el.classList.remove('locked');
    } else {
      el.classList.add('locked');
    }
  });
}

// Update Nerf Displays
function updateNerfDisplay(id, mult) {
  const el = document.getElementById(id);
  if (mult.lt(1)) {
    el.classList.remove('hidden');
    const percent = mult.times(100).toFixed(2);
    el.textContent = `⚠️ EXTREME NERF ACTIVE: Gain reduced to ${percent}%`;
  } else {
    el.classList.add('hidden');
  }
}

// Check Achievements
function checkAchievements() {
  if (gameState.hz.gte(1) && !gameState.achievements.ach1) {
    unlockAchievement('ach1', 'First Hertz');
  }
  if (gameState.hz.gte(100) && !gameState.achievements.ach2) {
    unlockAchievement('ach2', 'Frequency Rising');
  }
  if (gameState.hz.gte(10000) && !gameState.achievements.ach3) {
    unlockAchievement('ach3', 'Sonic Boom');
  }
  if (gameState.volumeUnlocked && !gameState.achievements.ach4) {
    unlockAchievement('ach4', 'Turn It Up!');
  }
  if (gameState.speakersUnlocked && !gameState.achievements.ach5) {
    unlockAchievement('ach5', 'Sound System');
  }
  if (gameState.speakers.gte(10) && !gameState.achievements.ach6) {
    unlockAchievement('ach6', 'Concert Hall');
  }
  if (gameState.infinityUnlocked && !gameState.achievements.ach7) {
    unlockAchievement('ach7', 'Reality Breaker');
  }
  if (gameState.infinity.gte(1000000) && !gameState.achievements.ach8) {
    unlockAchievement('ach8', 'Machine God');
  }
  if (gameState.eternityUnlocked && !gameState.achievements.ach9) {
    unlockAchievement('ach9', 'Eternal');
  }
  
  // Update achievement display
  Object.keys(gameState.achievements).forEach(key => {
    const el = document.getElementById(key);
    if (el && gameState.achievements[key]) {
      el.classList.add('completed');
    }
  });
}

function unlockAchievement(id, name) {
  gameState.achievements[id] = true;
  showPopup(`Achievement Unlocked: ${name}!`, 'achievement');
}

function showPopup(message, type = 'info') {
  const popup = document.getElementById('popup');
  popup.textContent = message;
  popup.classList.add('visible');
  popup.style.background = type === 'achievement' 
    ? 'linear-gradient(135deg, #10b981 0%, #34d399 100%)' 
    : 'rgba(0,0,0,0.9)';
  popup.style.color = type === 'achievement' ? '#000' : '#fff';
  setTimeout(() => popup.classList.remove('visible'), 3000);
}

// Passive Generation
function generatePassive() {
  // Passive Infinity
  if (gameState.infinityUpgrades[15].level.gt(0) && gameState.infinityUnlocked) {
    const gain = gameState.infinityUpgrades[15].level.times(0.01).div(30);
    gameState.infinity = gameState.infinity.plus(gain);
  }
  
  // Passive Eternity
  if (gameState.eternityUpgrades[20].level.gt(0) && gameState.eternityUnlocked) {
    const gain = gameState.eternityUpgrades[20].level.times(0.001).div(30);
    gameState.eternity = gameState.eternity.plus(gain);
  }
  
  // Hyper Infinity boost
  if (gameState.eternityUpgrades[12].level.gt(0) && gameState.infinityUpgrades[15].level.gt(0)) {
    const boost = gameState.eternityUpgrades[12].level.times(1000);
    const gain = gameState.infinityUpgrades[15].level.times(0.01).times(boost).div(30);
    gameState.infinity = gameState.infinity.plus(gain);
  }
}

// Update Display
function updateDisplay() {
  gameState.hzPerSec = calculateHzPerSec();
  
  // Hz display
  document.getElementById('hz-display').textContent = formatNumber(gameState.hz) + ' Hz';
  document.getElementById('gain-display').textContent = formatNumber(gameState.hzPerSec) + ' Hz/s';
  
  // Volume
  if (gameState.volumeUnlocked) {
    document.getElementById('tab-volume').classList.remove('hidden');
    document.getElementById('volume-display').textContent = formatNumber(gameState.volume);
    const volumeBoost = gameState.volume.plus(1).pow(0.8);
    document.getElementById('volume-boost').textContent = formatNumber(volumeBoost, 2) + 'x';
    updateNerfDisplay('volume-nerfs', getVolumeNerfMultiplier());
  }
  
  // Speakers
  if (gameState.speakersUnlocked) {
    document.getElementById('tab-speakers').classList.remove('hidden');
    document.getElementById('speakers-display').textContent = formatNumber(gameState.speakers);
    const speakerBoost = gameState.speakers.plus(1).pow(1.5);
    document.getElementById('speakers-boost').textContent = formatNumber(speakerBoost, 2) + 'x';
    updateNerfDisplay('speaker-nerfs', getSpeakerNerfMultiplier());
    
    // Infinitize button
    if (gameState.infinityUnlocked) {
      const infinitySection = document.getElementById('infinity-prestige-section');
      infinitySection.classList.remove('hidden');
      const gain = calculateInfinityGain();
      document.getElementById('infinity-gain-display').textContent = formatNumber(gain);
      document.getElementById('infinity-req-display').textContent = formatNumber(gameState.infinityReq);
      document.getElementById('infinitize-btn').disabled = gain.lt(1);
      document.getElementById('bulk-infinitize-btn').disabled = gain.lt(1);
    }
  }
  
  // Infinity
  if (gameState.infinityUnlocked) {
    document.getElementById('tab-infinity').classList.remove('hidden');
    document.getElementById('infinity-display').textContent = formatNumber(gameState.infinity);
    const infinityBoost = gameState.infinity.plus(1).pow(3);
    document.getElementById('infinity-boost').textContent = formatNumber(infinityBoost, 2) + 'x';
    document.getElementById('infinity-times-display').textContent = formatNumber(gameState.infinityTimes);
    
    // Machines
    if (gameState.infinity.gte(1000000)) {
      gameState.machinesUnlocked = true;
      document.getElementById('tab-machines').classList.remove('hidden');
      updateMachines();
    }
    
    // Eternitize button
    if (gameState.eternityUnlocked) {
      const eternitySection = document.getElementById('eternity-prestige-section');
      eternitySection.classList.remove('hidden');
      const gain = calculateEternityGain();
      document.getElementById('eternity-gain-display').textContent = formatNumber(gain);
      document.getElementById('eternity-req-display').textContent = formatNumber(gameState.eternityReq);
      document.getElementById('eternity-times-display').textContent = formatNumber(gameState.eternityTimes);
      document.getElementById('eternitize-btn').disabled = gain.lt(1);
      document.getElementById('bulk-eternitize-btn').disabled = gain.lt(1);
    }
  }
  
  // Eternity
  if (gameState.eternityUnlocked) {
    document.getElementById('tab-eternity').classList.remove('hidden');
    document.getElementById('eternity-display').textContent = formatNumber(gameState.eternity);
    const eternityBoost = getEternityBoost();
    document.getElementById('eternity-boost').textContent = formatNumber(eternityBoost, 2) + 'x';
  }
  
  // Prestige buttons
  const volumeGain = calculateVolumeGain();
  const speakerGain = calculateSpeakerGain();
  
  document.getElementById('volume-gain-display').textContent = formatNumber(volumeGain);
  document.getElementById('speaker-gain-display').textContent = formatNumber(speakerGain);
  
  const volumeBtn = document.getElementById('prestige-volume-btn');
  const speakerBtn = document.getElementById('prestige-speaker-btn');
  
  volumeBtn.disabled = volumeGain.lt(1);
  if (!gameState.volumeUnlocked) {
    volumeBtn.disabled = gameState.hz.lt(1000000);
  }
  
  if (gameState.volumeUnlocked) {
    document.getElementById('speaker-prestige-section').classList.remove('hidden');
    speakerBtn.disabled = speakerGain.lt(1);
    if (!gameState.speakersUnlocked) {
      speakerBtn.disabled = gameState.volume.lt(100);
    }
  }
  
  // Check for infinity trigger (first time)
  if (gameState.hz.gte(gameState.infinityReq) && !gameState.infinityUnlocked) {
    triggerInfinity();
  }
  
  // Check for eternity trigger (first time)
  if (gameState.infinity.gte(gameState.eternityReq) && !gameState.eternityUnlocked) {
    triggerEternity();
  }
  
  checkAchievements();
  renderUpgrades();
}

// Game Loop
function gameLoop() {
  gameState.hz = gameState.hz.plus(gameState.hzPerSec.div(30));
  generatePassive();
  updateDisplay();
}

// Save/Load
function saveGame() {
  const saveObj = {
    infinityDialogueShown: gameState.infinityDialogueShown,
    eternityDialogueShown: gameState.eternityDialogueShown,
    hz: gameState.hz.toString(),
    volume: gameState.volume.toString(),
    volumeUnlocked: gameState.volumeUnlocked,
    speakers: gameState.speakers.toString(),
    speakersUnlocked: gameState.speakersUnlocked,
    infinity: gameState.infinity.toString(),
    infinityUnlocked: gameState.infinityUnlocked,
    infinityReq: gameState.infinityReq.toString(),
    infinityTimes: gameState.infinityTimes.toString(),
    eternity: gameState.eternity.toString(),
    eternityUnlocked: gameState.eternityUnlocked,
    eternityReq: gameState.eternityReq.toString(),
    eternityTimes: gameState.eternityTimes.toString(),
    machinesUnlocked: gameState.machinesUnlocked,
    achievements: gameState.achievements,
    theme: gameState.theme,
    hzUpgrades: {},
    volumeUpgrades: {},
    speakerUpgrades: {},
    infinityUpgrades: {},
    eternityUpgrades: {}
  };
  
  // Save upgrade data
  Object.keys(gameState.hzUpgrades).forEach(key => {
    saveObj.hzUpgrades[key] = {
      level: gameState.hzUpgrades[key].level.toString(),
      cost: gameState.hzUpgrades[key].cost.toString()
    };
  });
  Object.keys(gameState.volumeUpgrades).forEach(key => {
    saveObj.volumeUpgrades[key] = {
      level: gameState.volumeUpgrades[key].level.toString(),
      cost: gameState.volumeUpgrades[key].cost.toString()
    };
  });
  Object.keys(gameState.speakerUpgrades).forEach(key => {
    saveObj.speakerUpgrades[key] = {
      level: gameState.speakerUpgrades[key].level.toString(),
      cost: gameState.speakerUpgrades[key].cost.toString()
    };
  });
  Object.keys(gameState.infinityUpgrades).forEach(key => {
    saveObj.infinityUpgrades[key] = {
      level: gameState.infinityUpgrades[key].level.toString(),
      cost: gameState.infinityUpgrades[key].cost.toString()
    };
  });
  Object.keys(gameState.eternityUpgrades).forEach(key => {
    saveObj.eternityUpgrades[key] = {
      level: gameState.eternityUpgrades[key].level.toString(),
      cost: gameState.eternityUpgrades[key].cost.toString()
    };
  });
  
  localStorage.setItem('hzGameSave', JSON.stringify(saveObj));
  showPopup('Game Saved!');
}

function loadGame() {
  const input = document.getElementById('save-input').value;
  try {
    const parsed = JSON.parse(input);
    
    gameState.infinityDialogueShown = parsed.infinityDialogueShown || false;
    gameState.eternityDialogueShown = parsed.eternityDialogueShown || false;
    gameState.hz = new Decimal(parsed.hz || 0);
    gameState.volume = new Decimal(parsed.volume || 0);
    gameState.volumeUnlocked = parsed.volumeUnlocked || false;
    gameState.speakers = new Decimal(parsed.speakers || 0);
    gameState.speakersUnlocked = parsed.speakersUnlocked || false;
    gameState.infinity = new Decimal(parsed.infinity || 0);
    gameState.infinityUnlocked = parsed.infinityUnlocked || false;
    gameState.infinityReq = new Decimal(parsed.infinityReq || "1e308");
    gameState.infinityTimes = new Decimal(parsed.infinityTimes || 0);
    gameState.eternity = new Decimal(parsed.eternity || 0);
    gameState.eternityUnlocked = parsed.eternityUnlocked || false;
    gameState.eternityReq = new Decimal(parsed.eternityReq || "1e308");
    gameState.eternityTimes = new Decimal(parsed.eternityTimes || 0);
    gameState.machinesUnlocked = parsed.machinesUnlocked || false;
    gameState.achievements = parsed.achievements || {};
    gameState.theme = parsed.theme || 'black';
    
    // Load upgrades
    if (parsed.hzUpgrades) {
      Object.keys(parsed.hzUpgrades).forEach(key => {
        gameState.hzUpgrades[key] = {
          level: new Decimal(parsed.hzUpgrades[key].level),
          cost: new Decimal(parsed.hzUpgrades[key].cost)
        };
      });
    }
    if (parsed.volumeUpgrades) {
      Object.keys(parsed.volumeUpgrades).forEach(key => {
        gameState.volumeUpgrades[key] = {
          level: new Decimal(parsed.volumeUpgrades[key].level),
          cost: new Decimal(parsed.volumeUpgrades[key].cost)
        };
      });
    }
    if (parsed.speakerUpgrades) {
      Object.keys(parsed.speakerUpgrades).forEach(key => {
        gameState.speakerUpgrades[key] = {
          level: new Decimal(parsed.speakerUpgrades[key].level),
          cost: new Decimal(parsed.speakerUpgrades[key].cost)
        };
      });
    }
    if (parsed.infinityUpgrades) {
      Object.keys(parsed.infinityUpgrades).forEach(key => {
        gameState.infinityUpgrades[key] = {
          level: new Decimal(parsed.infinityUpgrades[key].level),
          cost: new Decimal(parsed.infinityUpgrades[key].cost)
        };
      });
    }
    if (parsed.eternityUpgrades) {
      Object.keys(parsed.eternityUpgrades).forEach(key => {
        gameState.eternityUpgrades[key] = {
          level: new Decimal(parsed.eternityUpgrades[key].level),
          cost: new Decimal(parsed.eternityUpgrades[key].cost)
        };
      });
    }
    
    applyTheme(gameState.theme);
    updateDisplay();
    saveGame();
    document.getElementById('popup2').classList.remove('visible');
    showPopup('Game Loaded!');
  } catch (e) {
    showPopup('Invalid save data!');
  }
}

function exportSave() {
  const data = localStorage.getItem('hzGameSave');
  navigator.clipboard.writeText(data);
  showPopup('Save copied to clipboard!');
}

function downloadSave() {
  const data = localStorage.getItem('hzGameSave');
  const blob = new Blob([data], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'hertz_save.json';
  a.click();
  showPopup('Save downloaded!');
}

function resetGame() {
  if (confirm('Are you sure? This will delete ALL progress!')) {
    localStorage.removeItem('hzGameSave');
    location.reload();
  }
}

// Theme System
function applyTheme(theme) {
  const body = document.body;
  const themes = ['red', 'orange', 'yellow', 'green', 'blue', 'purple', 'pink', 'brown', 'black', 'white'];
  themes.forEach(t => body.classList.remove(`theme-${t}`));
  body.classList.add(`theme-${theme}`);
  
  document.querySelectorAll('.theme-btn').forEach(btn => {
    btn.classList.remove('active');
  });
  document.getElementById(`theme-${theme}`).classList.add('active');
}

function changeTheme(theme) {
  gameState.theme = theme;
  applyTheme(theme);
  saveGame();
  document.getElementById('popup-theme').classList.remove('visible');
}

// Tab System
function switchTab(tabName) {
  document.querySelectorAll('.tab').forEach(tab => {
    tab.classList.remove('bg-white', 'bg-green-500', 'bg-orange-500', 'bg-blue-500', 'bg-purple-500', 'bg-teal-500', 'bg-pink-500', 'bg-yellow-500', 'text-black');
    tab.classList.add('text-gray-300', 'bg-gray-800');
  });
  
  document.querySelectorAll('.content').forEach(content => {
    content.classList.add('hidden');
  });
  
  const activeTab = document.getElementById(`tab-${tabName}`);
  const color = activeTab.dataset.color;
  activeTab.classList.remove('text-gray-300', 'bg-gray-800');
  activeTab.classList.add(color, 'text-black');
  
  document.getElementById(`${tabName}-content`).classList.remove('hidden');
}

// Initialize
document.addEventListener('DOMContentLoaded', function() {
  // Load save
  const savedData = localStorage.getItem('hzGameSave');
  if (savedData) {
    try {
      const parsed = JSON.parse(savedData);
      
      gameState.infinityDialogueShown = parsed.infinityDialogueShown || false;
      gameState.eternityDialogueShown = parsed.eternityDialogueShown || false;
      gameState.hz = new Decimal(parsed.hz || 0);
      gameState.volume = new Decimal(parsed.volume || 0);
      gameState.volumeUnlocked = parsed.volumeUnlocked || false;
      gameState.speakers = new Decimal(parsed.speakers || 0);
      gameState.speakersUnlocked = parsed.speakersUnlocked || false;
      gameState.infinity = new Decimal(parsed.infinity || 0);
      gameState.infinityUnlocked = parsed.infinityUnlocked || false;
      gameState.infinityReq = new Decimal(parsed.infinityReq || "1e308");
      gameState.infinityTimes = new Decimal(parsed.infinityTimes || 0);
      gameState.eternity = new Decimal(parsed.eternity || 0);
      gameState.eternityUnlocked = parsed.eternityUnlocked || false;
      gameState.eternityReq = new Decimal(parsed.eternityReq || "1e308");
      gameState.eternityTimes = new Decimal(parsed.eternityTimes || 0);
      gameState.machinesUnlocked = parsed.machinesUnlocked || false;
      gameState.achievements = parsed.achievements || {};
      gameState.theme = parsed.theme || 'black';
      
      // Load upgrades
      if (parsed.hzUpgrades) {
        Object.keys(parsed.hzUpgrades).forEach(key => {
          gameState.hzUpgrades[key] = {
            level: new Decimal(parsed.hzUpgrades[key].level),
            cost: new Decimal(parsed.hzUpgrades[key].cost)
          };
        });
      }
      if (parsed.volumeUpgrades) {
        Object.keys(parsed.volumeUpgrades).forEach(key => {
          gameState.volumeUpgrades[key] = {
            level: new Decimal(parsed.volumeUpgrades[key].level),
            cost: new Decimal(parsed.volumeUpgrades[key].cost)
          };
        });
      }
      if (parsed.speakerUpgrades) {
        Object.keys(parsed.speakerUpgrades).forEach(key => {
          gameState.speakerUpgrades[key] = {
            level: new Decimal(parsed.speakerUpgrades[key].level),
            cost: new Decimal(parsed.speakerUpgrades[key].cost)
          };
        });
      }
      if (parsed.infinityUpgrades) {
        Object.keys(parsed.infinityUpgrades).forEach(key => {
          gameState.infinityUpgrades[key] = {
            level: new Decimal(parsed.infinityUpgrades[key].level),
            cost: new Decimal(parsed.infinityUpgrades[key].cost)
          };
        });
      }
      if (parsed.eternityUpgrades) {
        Object.keys(parsed.eternityUpgrades).forEach(key => {
          gameState.eternityUpgrades[key] = {
            level: new Decimal(parsed.eternityUpgrades[key].level),
            cost: new Decimal(parsed.eternityUpgrades[key].cost)
          };
        });
      }
    } catch (e) {
      console.error('Failed to load save:', e);
    }
  }
  
  applyTheme(gameState.theme);
  
  // Event Listeners
  document.getElementById('prestige-volume-btn').addEventListener('click', prestigeVolume);
  document.getElementById('prestige-speaker-btn').addEventListener('click', prestigeSpeaker);
  document.getElementById('infinitize-btn').addEventListener('click', doInfinity);
  document.getElementById('bulk-infinitize-btn').addEventListener('click', bulkInfinitize);
  document.getElementById('eternitize-btn').addEventListener('click', doEternity);
  document.getElementById('bulk-eternitize-btn').addEventListener('click', bulkEternitize);
  document.getElementById('infinity-ok-btn').addEventListener('click', acceptInfinity);
  document.getElementById('eternity-ok-btn').addEventListener('click', acceptEternity);
  
  document.getElementById('save-button').addEventListener('click', saveGame);
  document.getElementById('load-button').addEventListener('click', () => {
    document.getElementById('popup2').classList.add('visible');
  });
  document.getElementById('submit-load').addEventListener('click', loadGame);
  document.getElementById('cancel-load').addEventListener('click', () => {
    document.getElementById('popup2').classList.remove('visible');
  });
  document.getElementById('export-button').addEventListener('click', exportSave);
  document.getElementById('download-button').addEventListener('click', downloadSave);
  document.getElementById('reset-button').addEventListener('click', resetGame);
  
  document.getElementById('theme-button').addEventListener('click', () => {
    document.getElementById('popup-theme').classList.add('visible');
  });
  document.getElementById('close-theme').addEventListener('click', () => {
    document.getElementById('popup-theme').classList.remove('visible');
  });
  
  // Theme buttons
  const themes = ['red', 'orange', 'yellow', 'green', 'blue', 'purple', 'pink', 'brown', 'black', 'white'];
  themes.forEach(theme => {
    document.getElementById(`theme-${theme}`).addEventListener('click', () => changeTheme(theme));
  });
  
  // Tab buttons
  document.querySelectorAll('.tab').forEach(tab => {
    tab.addEventListener('click', function() {
      const contentName = this.id.replace('tab-', '');
      switchTab(contentName);
    });
  });
  
  // Start game loop
  setInterval(gameLoop, 1000 / 30);
  setInterval(saveGame, 30000); // Auto-save every 30 seconds
  
  updateDisplay();
});
