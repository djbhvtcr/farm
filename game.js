/* ===================================================================
   小小農村物語 — 完整遊戲邏輯
   =================================================================== */

// ===== GAME DATA DEFINITIONS =====

const SEED_TYPES = {
  carrot: {
    id: 'carrot', name: '胡蘿蔔種子', icon: '🥕', type: 'seed',
    img: 'images/item_seeds.png', cropImg: 'images/item_carrot.png',
    cropId: 'carrot_crop', growTime: 10000,
    desc: '種下後 10 秒即可收成美味的胡蘿蔔'
  },
  wheat: {
    id: 'wheat', name: '小麥種子', icon: '🌾', type: 'seed',
    img: 'images/item_seeds.png', cropImg: 'images/item_wheat.png',
    cropId: 'wheat_crop', growTime: 10000,
    desc: '金黃的小麥，動物們的最愛'
  },
  tomato: {
    id: 'tomato', name: '番茄種子', icon: '🍅', type: 'seed',
    img: 'images/item_seeds.png', cropImg: 'images/item_tomato.png',
    cropId: 'tomato_crop', growTime: 10000,
    desc: '鮮紅的番茄，營養滿分'
  },
  strawberry: {
    id: 'strawberry', name: '草莓種子', icon: '🍓', type: 'seed',
    img: 'images/item_seeds.png', cropImg: 'images/item_strawberry.png',
    cropId: 'strawberry_crop', growTime: 10000,
    desc: '甜甜的草莓，人見人愛'
  }
};

const CROP_TYPES = {
  carrot_crop: { id: 'carrot_crop', name: '胡蘿蔔', img: 'images/item_carrot.png', icon: '🥕', type: 'crop', desc: '新鮮的胡蘿蔔，兔子最愛吃' },
  wheat_crop: { id: 'wheat_crop', name: '小麥', img: 'images/item_wheat.png', icon: '🌾', type: 'crop', desc: '金色的麥穗，可以餵雞和牛' },
  tomato_crop: { id: 'tomato_crop', name: '番茄', img: 'images/item_tomato.png', icon: '🍅', type: 'crop', desc: '紅通通的番茄，牛和羊都喜歡' },
  strawberry_crop: { id: 'strawberry_crop', name: '草莓', img: 'images/item_strawberry.png', icon: '🍓', type: 'crop', desc: '香甜的草莓，兔子的最愛' }
};

const FOOD_TYPES = {
  hay: { id: 'hay', name: '乾草', img: 'images/item_wheat.png', icon: '🌿', type: 'food', desc: '基本的動物飼料' }
};

const TOOL_TYPES = {
  watering_can: { id: 'watering_can', name: '澆水壺', img: 'images/item_watering.png', icon: '💧', type: 'tool', desc: '為農作物澆水，促進生長' }
};

const ALL_ITEMS = { ...SEED_TYPES, ...CROP_TYPES, ...FOOD_TYPES, ...TOOL_TYPES };

// ===== SHOP ITEMS DEFINITIONS =====
const SHOP_ITEMS = [
  {
    id: 'carrot',
    name: '胡蘿蔔種子',
    category: 'seed',
    img: 'images/item_seeds.png',
    badge: '🥕 兔子最愛',
    growTime: '10 秒收成',
    desc: '成長迅速，收成後產出胡蘿蔔，可餵食小兔子',
    price: 10,
    priceBulk: 45,
    bulkCount: 5
  },
  {
    id: 'wheat',
    name: '小麥種子',
    category: 'seed',
    img: 'images/item_seeds.png',
    badge: '🌾 必備糧食',
    growTime: '10 秒收成',
    desc: '金黃小麥，收成後可餵食小雞、乳牛與小羊',
    price: 8,
    priceBulk: 35,
    bulkCount: 5
  },
  {
    id: 'tomato',
    name: '番茄種子',
    category: 'seed',
    img: 'images/item_seeds.png',
    badge: '🍅 鮮紅甜美',
    growTime: '10 秒收成',
    desc: '營養豐富的健康番茄，乳牛與小羊的最愛',
    price: 15,
    priceBulk: 68,
    bulkCount: 5
  },
  {
    id: 'strawberry',
    name: '草莓種子',
    category: 'seed',
    img: 'images/item_seeds.png',
    badge: '🍓 高級點心',
    growTime: '10 秒收成',
    desc: '香甜可口的草莓，小兔子最愛的人氣美味',
    price: 20,
    priceBulk: 90,
    bulkCount: 5
  },
  {
    id: 'hay',
    name: '優質乾草捆',
    category: 'food',
    img: 'images/item_wheat.png',
    badge: '🌿 萬能飼料',
    growTime: '即買即用',
    desc: '天然牧草乾燥特製，所有農場小動物都能食用',
    price: 8,
    priceBulk: 35,
    bulkCount: 5
  }
];

const ANIMAL_DEFS = [
  {
    id: 'chicken', name: '小雞', img: 'images/animal_chicken.png', icon: '🐔',
    acceptedFood: ['wheat_crop', 'wheat', 'hay'],
    foodNames: '小麥、種子、乾草',
    happyEmoji: '💛'
  },
  {
    id: 'rabbit', name: '兔子', img: 'images/animal_rabbit.png', icon: '🐰',
    acceptedFood: ['carrot_crop', 'strawberry_crop', 'carrot', 'strawberry', 'hay'],
    foodNames: '胡蘿蔔、草莓、乾草',
    happyEmoji: '💖'
  },
  {
    id: 'cow', name: '乳牛', img: 'images/animal_cow.png', icon: '🐄',
    acceptedFood: ['wheat_crop', 'tomato_crop', 'hay', 'wheat'],
    foodNames: '小麥、番茄、乾草',
    happyEmoji: '💚'
  },
  {
    id: 'sheep', name: '小羊', img: 'images/animal_sheep.png', icon: '🐑',
    acceptedFood: ['wheat_crop', 'tomato_crop', 'hay', 'wheat'],
    foodNames: '小麥、番茄、乾草',
    happyEmoji: '💜'
  }
];

// ===== GAME STATE =====
let gameState = {
  day: 1,
  coins: 50,
  currentTool: 'hand',
  selectedSeed: null,
  inventory: {
    carrot: 8,
    wheat: 8,
    tomato: 6,
    strawberry: 6,
    carrot_crop: 3,
    wheat_crop: 5,
    tomato_crop: 2,
    strawberry_crop: 2,
    hay: 5,
    watering_can: 1
  },
  plots: Array(8).fill(null).map(() => ({
    planted: null,     // seed type id
    watered: false,
    stage: 0,          // 0=empty, 1=seed, 2=sprout, 3=growing, 4=mature
    growStart: null,
    growTimer: null
  })),
  animals: ANIMAL_DEFS.map(a => ({
    ...a,
    happiness: 50,
    fedToday: false,
    currentFrame: 0
  })),
  sceneX: 0
};

// ===== DOM ELEMENTS =====
const $ = (sel) => document.querySelector(sel);
const $$ = (sel) => document.querySelectorAll(sel);

let els = {};

function cacheDom() {
  els = {
    titleScreen: $('#title-screen'),
    startBtn: $('#start-btn'),
    gameContainer: $('#game-container'),
    sceneViewport: $('#scene-viewport'),
    sceneWorld: $('#scene-world'),
    farmPlots: $('#farm-plots'),
    animalPen: $('#animal-pen'),
    toolbar: $('#toolbar'),
    seedSelect: $('#seed-select'),
    invPanel: $('#inventory-panel'),
    invGrid: $('#inv-grid'),
    invClose: $('#inv-close'),
    shopPanel: $('#shop-panel'),
    shopGrid: $('#shop-grid'),
    shopClose: $('#shop-close'),
    shopCoins: $('#shop-coins'),
    overlay: $('#overlay'),
    btnInventory: $('#btn-inventory'),
    btnShop: $('#btn-shop'),
    btnHome: $('#btn-home'),
    hudDay: $('#hud-day'),
    hudCoins: $('#hud-coins'),
    dragGhost: $('#drag-ghost'),
    tooltip: $('#item-tooltip'),
    scrollLeft: $('#scroll-left'),
    scrollRight: $('#scroll-right'),
    saveIndicator: $('#save-indicator'),
    navHint: $('#nav-hint')
  };
}

// ===== INITIALIZATION =====
function initGame() {
  cacheDom();
  loadGame();
  setupTitleScreen();
  buildFarmPlots();
  buildAnimals();
  buildSeedSelect();
  buildToolbar();
  setupSceneScroll();
  setupToolbar();
  setupInventory();
  setupShop();
  setupDragDrop();
  updateHUD();
  startAnimalIdleAnimations();
  startGrowthTimers();

  // Auto-save every 30s
  setInterval(saveGame, 30000);
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initGame);
} else {
  initGame();
}

// ===== TITLE SCREEN =====
function setupTitleScreen() {
  els.startBtn.addEventListener('click', () => {
    els.titleScreen.classList.add('hidden');
    setTimeout(() => {
      els.gameContainer.classList.add('active');
      els.titleScreen.style.display = 'none';
    }, 800);
  });

  els.btnHome.addEventListener('click', () => {
    saveGame();
    els.gameContainer.classList.remove('active');
    els.titleScreen.style.display = '';
    els.titleScreen.classList.remove('hidden');
  });
}

// ===== SCENE SCROLLING =====
let isDraggingScene = false;
let dragStartX = 0;
let sceneStartX = 0;
let isDraggingItem = false; // prevent scene scroll during item drag

function setupSceneScroll() {
  const viewport = els.sceneViewport;
  const maxScroll = 3200 - window.innerWidth;

  function setSceneX(x) {
    gameState.sceneX = Math.max(-maxScroll, Math.min(0, x));
    els.sceneWorld.style.transform = `translateX(${gameState.sceneX}px)`;
  }

  // Mouse drag
  viewport.addEventListener('mousedown', (e) => {
    if (isDraggingItem) return;
    if (gameState.currentTool !== 'hand') return;
    isDraggingScene = true;
    dragStartX = e.clientX;
    sceneStartX = gameState.sceneX;
    e.preventDefault();
  });

  window.addEventListener('mousemove', (e) => {
    if (!isDraggingScene) return;
    const dx = e.clientX - dragStartX;
    setSceneX(sceneStartX + dx);
  });

  window.addEventListener('mouseup', () => {
    isDraggingScene = false;
  });

  // Touch drag
  let touchStartX = 0;
  viewport.addEventListener('touchstart', (e) => {
    if (isDraggingItem) return;
    if (e.touches.length > 1) return;
    isDraggingScene = true;
    touchStartX = e.touches[0].clientX;
    sceneStartX = gameState.sceneX;
  }, { passive: true });

  viewport.addEventListener('touchmove', (e) => {
    if (!isDraggingScene || isDraggingItem) return;
    const dx = e.touches[0].clientX - touchStartX;
    setSceneX(sceneStartX + dx);
  }, { passive: true });

  viewport.addEventListener('touchend', () => {
    isDraggingScene = false;
  });

  // Arrow buttons
  let scrollInterval = null;

  function startScroll(dir) {
    scrollInterval = setInterval(() => {
      setSceneX(gameState.sceneX + dir * 8);
    }, 16);
  }

  function stopScroll() {
    clearInterval(scrollInterval);
    scrollInterval = null;
  }

  els.scrollLeft.addEventListener('mousedown', () => startScroll(1));
  els.scrollLeft.addEventListener('mouseup', stopScroll);
  els.scrollLeft.addEventListener('mouseleave', stopScroll);
  els.scrollLeft.addEventListener('touchstart', (e) => { e.preventDefault(); startScroll(1); });
  els.scrollLeft.addEventListener('touchend', stopScroll);

  els.scrollRight.addEventListener('mousedown', () => startScroll(-1));
  els.scrollRight.addEventListener('mouseup', stopScroll);
  els.scrollRight.addEventListener('mouseleave', stopScroll);
  els.scrollRight.addEventListener('touchstart', (e) => { e.preventDefault(); startScroll(-1); });
  els.scrollRight.addEventListener('touchend', stopScroll);

  // Keyboard arrows
  window.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') setSceneX(gameState.sceneX + 50);
    if (e.key === 'ArrowRight') setSceneX(gameState.sceneX - 50);
  });

  // Restore saved position
  setSceneX(gameState.sceneX);
}

// ===== FARM PLOTS =====
function buildFarmPlots() {
  els.farmPlots.innerHTML = '';
  for (let i = 0; i < 8; i++) {
    const plot = document.createElement('div');
    plot.className = 'farm-plot';
    plot.dataset.index = i;
    plot.innerHTML = `
      <div class="plot-plant"></div>
      <div class="plot-status"></div>
      <div class="plot-progress" style="width:0%"></div>
    `;
    els.farmPlots.appendChild(plot);
  }
  updateAllPlots();

  // Click handlers for plots
  els.farmPlots.addEventListener('click', (e) => {
    const plotEl = e.target.closest('.farm-plot');
    if (!plotEl) return;
    const idx = parseInt(plotEl.dataset.index);
    handlePlotClick(idx, plotEl);
  });
}

function handlePlotClick(idx, plotEl) {
  const plot = gameState.plots[idx];
  const tool = gameState.currentTool;

  if (tool === 'seed' && plot.stage === 0) {
    // Plant a seed
    const seedId = gameState.selectedSeed;
    if (!seedId) {
      showToast('⚠️ 請先選擇一種種子！', 'warning');
      return;
    }
    if ((gameState.inventory[seedId] || 0) <= 0) {
      showToast('❌ 種子不夠了！', 'error');
      return;
    }

    gameState.inventory[seedId]--;
    plot.planted = seedId;
    plot.stage = 1;
    plot.watered = false;
    plot.growStart = null;

    updatePlotVisual(idx);
    updateToolbar();
    showToast(`🌱 種下了${SEED_TYPES[seedId].name}！`, 'success');
    spawnParticles(plotEl, ['🌱', '✨']);

  } else if (tool === 'water' && plot.stage >= 1 && plot.stage < 4 && !plot.watered) {
    // Water the plot
    plot.watered = true;
    plotEl.classList.add('watered');

    // Start growth timer
    plot.growStart = Date.now();
    startPlotGrowth(idx);

    updatePlotVisual(idx);
    showToast('💧 澆水成功！植物開始生長...', 'success');
    showWaterAnimation(plotEl);

  } else if (tool === 'water' && plot.watered && plot.stage < 4) {
    showToast('💧 已經澆過水了！', 'warning');

  } else if (tool === 'harvest' && plot.stage === 4) {
    // Harvest
    const seedDef = SEED_TYPES[plot.planted];
    const cropId = seedDef.cropId;
    gameState.inventory[cropId] = (gameState.inventory[cropId] || 0) + 1;
    gameState.coins += 10;

    // Reset plot
    clearTimeout(plot.growTimer);
    plot.planted = null;
    plot.watered = false;
    plot.stage = 0;
    plot.growStart = null;
    plot.growTimer = null;

    plotEl.classList.remove('watered');
    updatePlotVisual(idx);
    updateHUD();
    updateToolbar();
    showToast(`🧺 收成了 ${CROP_TYPES[cropId].name}！+10 金幣`, 'success');
    spawnParticles(plotEl, ['✨', '🌟', CROP_TYPES[cropId].icon]);

  } else if (tool === 'seed' && plot.stage > 0) {
    showToast('🚫 這塊地已經種了東西！', 'warning');

  } else if (tool === 'harvest' && plot.stage < 4 && plot.stage > 0) {
    showToast('⏳ 還沒成熟喔，再等等！', 'warning');

  } else if (tool === 'harvest' && plot.stage === 0) {
    showToast('🤔 這裡什麼都沒種...', 'warning');
  }
}

function startPlotGrowth(idx) {
  const plot = gameState.plots[idx];
  if (!plot.planted || !plot.watered) return;

  const seedDef = SEED_TYPES[plot.planted];
  const totalTime = seedDef.growTime;
  const elapsed = plot.growStart ? (Date.now() - plot.growStart) : 0;
  const remaining = Math.max(0, totalTime - elapsed);

  // Calculate current stage from elapsed time
  const progress = Math.min(1, elapsed / totalTime);
  if (progress >= 1) {
    plot.stage = 4;
    updatePlotVisual(idx);
    return;
  } else if (progress >= 0.66) {
    plot.stage = 3;
  } else if (progress >= 0.33) {
    plot.stage = 2;
  } else {
    plot.stage = 1;
  }

  updatePlotVisual(idx);

  // Set up stage transitions
  const stageTimings = [
    { stage: 2, time: totalTime * 0.33 },
    { stage: 3, time: totalTime * 0.66 },
    { stage: 4, time: totalTime }
  ];

  stageTimings.forEach(({ stage, time }) => {
    const delay = time - elapsed;
    if (delay > 0) {
      const timer = setTimeout(() => {
        if (gameState.plots[idx].planted && gameState.plots[idx].watered) {
          gameState.plots[idx].stage = stage;
          updatePlotVisual(idx);
          if (stage === 4) {
            showToast(`🌟 ${SEED_TYPES[gameState.plots[idx].planted].name.replace('種子','')} 成熟了！`, 'success');
          }
        }
      }, delay);

      // Store the latest timer
      if (stage === 4) {
        plot.growTimer = timer;
      }
    }
  });

  // Update progress bar animation
  startProgressAnimation(idx, elapsed, totalTime);
}

function startProgressAnimation(idx, elapsed, totalTime) {
  const plotEl = els.farmPlots.children[idx];
  if (!plotEl) return;
  const progressBar = plotEl.querySelector('.plot-progress');

  function updateProgress() {
    const plot = gameState.plots[idx];
    if (!plot.planted || !plot.watered || plot.stage === 4) {
      progressBar.style.width = plot.stage === 4 ? '100%' : '0%';
      return;
    }
    const now = Date.now();
    const progress = Math.min(1, (now - plot.growStart) / totalTime);
    progressBar.style.width = `${progress * 100}%`;
    requestAnimationFrame(updateProgress);
  }
  requestAnimationFrame(updateProgress);
}

function updatePlotVisual(idx) {
  const plot = gameState.plots[idx];
  const plotEl = els.farmPlots.children[idx];
  if (!plotEl) return;

  const plantEl = plotEl.querySelector('.plot-plant');
  const statusEl = plotEl.querySelector('.plot-status');
  const progressEl = plotEl.querySelector('.plot-progress');

  if (!plot.planted || plot.stage === 0) {
    plantEl.innerHTML = `<img src="images/item_soil.png" alt="農田泥土" class="plot-soil-empty">`;
    plantEl.className = 'plot-plant';
    statusEl.textContent = '空地';
    progressEl.style.width = '0%';
    plotEl.classList.remove('watered');
    return;
  }

  const seedDef = SEED_TYPES[plot.planted];
  let imgSrc = 'images/item_soil.png';
  let isMature = false;

  if (plot.stage === 1) {
    imgSrc = 'images/item_seeds.png';
    statusEl.textContent = plot.watered ? '💧 已澆水' : '需要澆水';
    progressEl.style.background = 'var(--blue)';
  } else if (plot.stage === 2) {
    imgSrc = 'images/item_sprout.png';
    statusEl.textContent = '🌱 幼苗';
    progressEl.style.background = 'var(--green)';
  } else if (plot.stage === 3) {
    imgSrc = 'images/item_growing.png';
    statusEl.textContent = '🌿 生長中';
    progressEl.style.background = 'var(--green)';
  } else if (plot.stage === 4) {
    imgSrc = seedDef.cropImg || 'images/item_mature.png';
    isMature = true;
    statusEl.textContent = '✅ 可收成';
    progressEl.style.width = '100%';
    progressEl.style.background = 'var(--orange)';
  }

  plantEl.className = 'plot-plant';
  plantEl.innerHTML = `<img src="${imgSrc}" alt="${seedDef.name}" class="plot-avatar-img ${isMature ? 'harvest-ready' : 'anim-grow'}">`;

  if (plot.watered) {
    plotEl.classList.add('watered');
  } else {
    plotEl.classList.remove('watered');
  }
}

function updateAllPlots() {
  for (let i = 0; i < 8; i++) {
    updatePlotVisual(i);
  }
}

function startGrowthTimers() {
  // Restore growth timers for plots that were growing
  gameState.plots.forEach((plot, idx) => {
    if (plot.planted && plot.watered && plot.stage < 4 && plot.growStart) {
      startPlotGrowth(idx);
    }
  });
}

// ===== ANIMALS =====
function buildAnimals() {
  els.animalPen.innerHTML = '';
  gameState.animals.forEach((animal, idx) => {
    const slot = document.createElement('div');
    slot.className = 'animal-slot';
    slot.dataset.index = idx;
    slot.innerHTML = `
      <div class="animal-mood">${animal.happiness >= 70 ? '💖' : animal.happiness >= 40 ? '😊' : '😐'}</div>
      <div class="animal-avatar">
        <img src="${animal.img}" alt="${animal.name}" class="animal-avatar-img">
      </div>
      <div class="animal-name">${animal.name}</div>
      <div class="animal-food-hint">喜歡：${animal.foodNames}</div>
    `;
    els.animalPen.appendChild(slot);
  });

  // Click handler
  els.animalPen.addEventListener('click', (e) => {
    const slot = e.target.closest('.animal-slot');
    if (!slot) return;
    const idx = parseInt(slot.dataset.index);
    handleAnimalClick(idx);
  });
}

function handleAnimalClick(idx) {
  const animal = gameState.animals[idx];
  const tool = gameState.currentTool;
  const slot = els.animalPen.children[idx];
  const img = slot ? slot.querySelector('.animal-avatar-img') : null;

  if (img) {
    img.classList.remove('happy');
    void img.offsetWidth;
    img.classList.add('happy');
    setTimeout(() => img.classList.remove('happy'), 800);
  }

  if (tool === 'feed') {
    // 優先從包包尋找該動物可接受的食物進行餵食
    const foodId = animal.acceptedFood.find(id => (gameState.inventory[id] || 0) > 0);
    if (foodId) {
      feedAnimal(idx, foodId);
    } else {
      showToast(`${animal.name} 喜歡吃：${animal.foodNames}。目前包包沒有對應食物，快打開包包或去農田收成！`, 'warning');
      if (!els.invPanel.classList.contains('open')) {
        toggleInventory();
      }
    }
  } else {
    showToast(`🐾 ${animal.name} 向你開心地打了招呼！喜歡吃：${animal.foodNames}`, 'success');
  }
}

function feedAnimal(animalIdx, itemId) {
  const animal = gameState.animals[animalIdx];
  if (!animal) return false;

  if (!animal.acceptedFood.includes(itemId)) {
    const itemDef = ALL_ITEMS[itemId];
    showToast(`🚫 ${animal.name} 不喜歡吃 ${itemDef ? itemDef.name : '這個'}！喜歡：${animal.foodNames}`, 'error');
    return false;
  }

  if ((gameState.inventory[itemId] || 0) <= 0) {
    showToast('❌ 物品數量不足！', 'error');
    return false;
  }

  // 扣除食物
  gameState.inventory[itemId]--;
  animal.happiness = Math.min(100, animal.happiness + 25);
  animal.fedToday = true;
  gameState.coins += 10;

  // 視覺反饋動畫
  const slot = els.animalPen.children[animalIdx];
  const img = slot ? slot.querySelector('.animal-avatar-img') : null;
  const mood = slot ? slot.querySelector('.animal-mood') : null;

  if (img) {
    img.classList.remove('happy');
    void img.offsetWidth;
    img.classList.add('happy');
    setTimeout(() => img.classList.remove('happy'), 1000);
  }

  if (mood) {
    mood.textContent = animal.happyEmoji;
    setTimeout(() => {
      mood.textContent = animal.happiness >= 70 ? '💖' : animal.happiness >= 40 ? '😊' : '😐';
    }, 2500);
  }

  updateHUD();
  updateInventoryPanel();
  updateToolbar();

  const itemDef = ALL_ITEMS[itemId];
  showToast(`${animal.happyEmoji} ${animal.name} 開心地吃了 ${itemDef ? itemDef.name : '食物'}！+10 金幣 💰`, 'success');
  spawnParticles(slot, [animal.happyEmoji, '✨', '🌟', '💖']);

  saveGame();
  return true;
}

function startAnimalIdleAnimations() {
  // Idle animations are smoothly handled by CSS @keyframes animalBob
}

// ===== SEED SELECT =====
function buildSeedSelect() {
  els.seedSelect.innerHTML = '';
  Object.values(SEED_TYPES).forEach(seed => {
    const opt = document.createElement('div');
    opt.className = 'seed-option';
    opt.dataset.seedId = seed.id;
    opt.innerHTML = `
      <div class="seed-option-icon">
        <img src="${seed.cropImg || seed.img}" alt="${seed.name}" class="seed-opt-img">
      </div>
      <div class="seed-option-name">${seed.name.replace('種子','')}</div>
      <div class="seed-option-count">x${gameState.inventory[seed.id] || 0}</div>
    `;
    opt.addEventListener('click', () => {
      if ((gameState.inventory[seed.id] || 0) <= 0) {
        showToast(`❌ ${seed.name}已經用完了！為您開啟商店選購 🌱`, 'warning');
        toggleShop(true);
        return;
      }
      gameState.selectedSeed = seed.id;
      $$('.seed-option').forEach(o => o.classList.remove('selected'));
      opt.classList.add('selected');
      showToast(`🌱 選擇了 ${seed.name}`, 'success');
    });
    els.seedSelect.appendChild(opt);
  });

  // 快捷商店按鈕，點擊直接打開種子雜貨舖
  const shopOpt = document.createElement('div');
  shopOpt.className = 'seed-option seed-shop-shortcut';
  shopOpt.title = '前往種子商店購買種子';
  shopOpt.innerHTML = `
    <div class="seed-option-icon" style="font-size:1.4rem;">🏪</div>
    <div class="seed-option-name" style="color:var(--carrot-orange); font-weight:800;">買種子</div>
    <div class="seed-option-count" style="background:var(--carrot-orange); color:#fff; border-radius:50%; min-width:16px; height:16px; display:flex; align-items:center; justify-content:center;">+</div>
  `;
  shopOpt.addEventListener('click', () => {
    toggleShop(true);
  });
  els.seedSelect.appendChild(shopOpt);
}

function updateSeedSelect() {
  const opts = els.seedSelect.querySelectorAll('.seed-option[data-seed-id]');
  opts.forEach(opt => {
    const seedId = opt.dataset.seedId;
    const count = gameState.inventory[seedId] || 0;
    opt.querySelector('.seed-option-count').textContent = `x${count}`;
  });
}

// ===== TOOLBAR =====
function buildToolbar() {
  updateToolbar();
}

function setupToolbar() {
  $$('.tool-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const tool = btn.dataset.tool;
      gameState.currentTool = tool;

      $$('.tool-btn').forEach(b => b.classList.remove('selected'));
      btn.classList.add('selected');

      // Show/hide seed select
      if (tool === 'seed') {
        els.seedSelect.classList.add('open');
        updateSeedSelect();
      } else {
        els.seedSelect.classList.remove('open');
      }

      // Change cursor
      els.sceneViewport.style.cursor = tool === 'hand' ? 'grab' : 'crosshair';
    });
  });

  // Default to hand
  const handBtn = document.querySelector('[data-tool="hand"]');
  if (handBtn) handBtn.classList.add('selected');
}

function updateToolbar() {
  // Update seed counts in seed select
  updateSeedSelect();
}

// ===== INVENTORY =====
let currentInvTab = 'all';

function setupInventory() {
  els.btnInventory.addEventListener('click', () => toggleInventory());
  els.invClose.addEventListener('click', () => toggleInventory(false));
  els.overlay.addEventListener('click', () => {
    if (els.invPanel.classList.contains('open')) {
      toggleInventory(false);
    }
    if (els.shopPanel && els.shopPanel.classList.contains('open')) {
      toggleShop(false);
    }
  });

  // Tabs
  $$('.inv-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      currentInvTab = tab.dataset.tab;
      $$('.inv-tab').forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      updateInventoryPanel();
    });
  });
}

function toggleInventory(forceState) {
  const isOpen = forceState !== undefined ? forceState : !els.invPanel.classList.contains('open');

  // 若開啟背包，自動關閉商店
  if (isOpen && els.shopPanel && els.shopPanel.classList.contains('open')) {
    els.shopPanel.classList.remove('open');
  }

  els.invPanel.classList.toggle('open', isOpen);
  els.overlay.classList.toggle('active', isOpen);
  if (isOpen) {
    updateInventoryPanel();
  }
}

function updateInventoryPanel() {
  els.invGrid.innerHTML = '';

  const items = Object.entries(gameState.inventory)
    .filter(([id, count]) => {
      const def = ALL_ITEMS[id];
      if (!def) return false;
      if (currentInvTab === 'all') return true;
      if (currentInvTab === 'food') return def.type === 'food' || def.type === 'crop';
      return def.type === currentInvTab;
    })
    .filter(([id, count]) => ALL_ITEMS[id]); // only known items

  if (items.length === 0) {
    els.invGrid.innerHTML = `
      <div style="grid-column:1/-1; text-align:center; padding:26px; color:var(--text-secondary); font-weight:600;">
        📦 此分類沒有物品
        ${currentInvTab === 'seed' ? '<div style="margin-top:12px;"><button class="shop-buy-btn single" style="max-width:200px; margin:0 auto; cursor:pointer;" onclick="toggleShop(true)">🏪 前往種子雜貨舖購買</button></div>' : ''}
      </div>
    `;
    return;
  }

  items.forEach(([id, count]) => {
    const def = ALL_ITEMS[id];
    const slot = document.createElement('div');
    slot.className = `inv-slot ${count <= 0 ? 'empty' : ''}`;
    slot.dataset.itemId = id;
    slot.draggable = count > 0;
    slot.innerHTML = `
      <div class="inv-slot-icon">
        <img src="${def.img}" alt="${def.name}" class="inv-slot-img">
      </div>
      <div class="inv-slot-name">${def.name}</div>
      ${count > 0 ? `<div class="inv-slot-count">${count}</div>` : ''}
    `;

    // Tooltip on hover
    slot.addEventListener('mouseenter', (e) => {
      showItemTooltip(def, count, e);
    });
    slot.addEventListener('mouseleave', hideItemTooltip);

    els.invGrid.appendChild(slot);
  });

  // 在種子分頁加入直達商店的快捷小卡
  if (currentInvTab === 'seed') {
    const shopSlot = document.createElement('div');
    shopSlot.className = 'inv-slot';
    shopSlot.style.borderColor = 'var(--carrot-orange)';
    shopSlot.style.borderStyle = 'dashed';
    shopSlot.style.background = 'rgba(255, 243, 224, 0.7)';
    shopSlot.style.cursor = 'pointer';
    shopSlot.title = '前往種子商店選購';
    shopSlot.innerHTML = `
      <div class="inv-slot-icon" style="font-size:1.8rem; line-height:46px;">🏪</div>
      <div class="inv-slot-name" style="color:var(--carrot-orange); font-weight:800;">買種子</div>
      <div class="inv-slot-count" style="background:var(--carrot-orange); color:#fff;">+</div>
    `;
    shopSlot.addEventListener('click', () => {
      toggleShop(true);
    });
    els.invGrid.appendChild(shopSlot);
  }
}

// ===== SEED & FEED SHOP — 種子與飼料商店 =====
function setupShop() {
  if (els.btnShop) {
    els.btnShop.addEventListener('click', () => toggleShop());
  }
  if (els.shopClose) {
    els.shopClose.addEventListener('click', () => toggleShop(false));
  }
}

function toggleShop(forceState) {
  const isOpen = forceState !== undefined ? forceState : !els.shopPanel.classList.contains('open');

  // 若開啟商店，自動關閉背包
  if (isOpen && els.invPanel && els.invPanel.classList.contains('open')) {
    els.invPanel.classList.remove('open');
  }

  els.shopPanel.classList.toggle('open', isOpen);
  els.overlay.classList.toggle('active', isOpen);

  if (isOpen) {
    updateShopPanel();
  }
}

function updateShopPanel() {
  if (!els.shopGrid) return;
  els.shopGrid.innerHTML = '';
  if (els.shopCoins) {
    els.shopCoins.textContent = gameState.coins;
  }

  SHOP_ITEMS.forEach(item => {
    const owned = gameState.inventory[item.id] || 0;
    const canAffordSingle = gameState.coins >= item.price;
    const canAffordBulk = gameState.coins >= item.priceBulk;

    const card = document.createElement('div');
    card.className = 'shop-card';
    card.innerHTML = `
      <div class="shop-card-badge">${item.badge}</div>
      <div class="shop-card-main">
        <div class="shop-card-icon-wrap">
          <img src="${item.img}" alt="${item.name}" class="shop-card-img">
        </div>
        <div class="shop-card-details">
          <div class="shop-card-name">${item.name}</div>
          <div class="shop-card-time">⚡ ${item.growTime}</div>
          <div class="shop-card-desc">${item.desc}</div>
        </div>
      </div>
      <div class="shop-card-owned">🎒 目前擁有：<span class="shop-owned-val">${owned}</span></div>
      <div class="shop-card-actions">
        <button class="shop-buy-btn single ${canAffordSingle ? '' : 'disabled'}" title="${canAffordSingle ? '購買 1 包' : '金幣不足'}">
          🌱 買 1 包 <span class="buy-cost">💰${item.price}</span>
        </button>
        <button class="shop-buy-btn bulk ${canAffordBulk ? '' : 'disabled'}" title="${canAffordBulk ? '購買 5 包（特惠省金幣）' : '金幣不足'}">
          📦 買 ${item.bulkCount} 包 <span class="buy-cost">💰${item.priceBulk}</span>
        </button>
      </div>
    `;

    const singleBtn = card.querySelector('.shop-buy-btn.single');
    const bulkBtn = card.querySelector('.shop-buy-btn.bulk');

    singleBtn.addEventListener('click', () => {
      buyShopItem(item.id, 1, item.price);
    });

    bulkBtn.addEventListener('click', () => {
      buyShopItem(item.id, item.bulkCount, item.priceBulk);
    });

    els.shopGrid.appendChild(card);
  });
}

function buyShopItem(itemId, count, cost) {
  if (gameState.coins < cost) {
    showToast(`💰 金幣不足！還差 ${cost - gameState.coins} 金幣，快去收成農作物或餵食動物吧！`, 'error');
    return false;
  }

  // 扣除金幣並入背包
  gameState.coins -= cost;
  gameState.inventory[itemId] = (gameState.inventory[itemId] || 0) + count;

  const itemDef = ALL_ITEMS[itemId] || SHOP_ITEMS.find(s => s.id === itemId);
  const itemName = itemDef ? itemDef.name : '物品';

  updateHUD();
  updateShopPanel();
  updateInventoryPanel();
  updateToolbar();

  showToast(`🎉 成功購買 ${count} 包【${itemName}】！剩餘金幣：${gameState.coins} 💰`, 'success');
  spawnParticles(els.shopPanel, ['💰', '✨', '🌱', '🌟']);

  saveGame();
  return true;
}

// ===== 物品拖曳與放置判定（餵食 / 種植 / 澆水） =====
function executeItemDrop(itemId, clientX, clientY) {
  if (!itemId) return false;
  const def = ALL_ITEMS[itemId];
  if (!def) return false;

  // 暫時隱藏幽靈圖示，精確獲取游標下方的真實 DOM 元素
  const prevDisplay = els.dragGhost.style.display;
  els.dragGhost.style.display = 'none';
  const elementUnder = document.elementFromPoint(clientX, clientY);
  els.dragGhost.style.display = prevDisplay;

  if (!elementUnder) return false;

  // 1. 判定是否放置於特定動物 Slot 上
  const animalSlot = elementUnder.closest('.animal-slot');
  if (animalSlot) {
    const animalIdx = parseInt(animalSlot.dataset.index);
    return feedAnimal(animalIdx, itemId);
  }

  // 若放置在可愛動物區圍欄內（包含空隙），自動尋找距離最近的動物進行餵食
  const animalPen = elementUnder.closest('.animal-pen') || elementUnder.closest('.animal-zone');
  if (animalPen) {
    const slots = Array.from(document.querySelectorAll('.animal-slot'));
    let closestSlot = null;
    let minDist = Infinity;
    slots.forEach(s => {
      const rect = s.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dist = Math.hypot(clientX - cx, clientY - cy);
      if (dist < minDist) {
        minDist = dist;
        closestSlot = s;
      }
    });
    if (closestSlot && minDist < 350) {
      const animalIdx = parseInt(closestSlot.dataset.index);
      return feedAnimal(animalIdx, itemId);
    }
  }

  // 2. 判定是否放置於農田 Plot 上
  const plotEl = elementUnder.closest('.farm-plot');
  if (plotEl) {
    const idx = parseInt(plotEl.dataset.index);
    if (def.type === 'seed') {
      const prevTool = gameState.currentTool;
      const prevSeed = gameState.selectedSeed;
      gameState.currentTool = 'seed';
      gameState.selectedSeed = itemId;
      handlePlotClick(idx, plotEl);
      gameState.currentTool = prevTool;
      gameState.selectedSeed = prevSeed;
      return true;
    } else if (def.type === 'tool' && itemId === 'watering_can') {
      const prevTool = gameState.currentTool;
      gameState.currentTool = 'water';
      handlePlotClick(idx, plotEl);
      gameState.currentTool = prevTool;
      return true;
    } else {
      showToast('🤔 這個物品不能放在農田上', 'warning');
      return false;
    }
  }

  return false;
}

function updateDropHighlight(clientX, clientY) {
  const prevDisplay = els.dragGhost.style.display;
  els.dragGhost.style.display = 'none';
  const elementUnder = document.elementFromPoint(clientX, clientY);
  els.dragGhost.style.display = prevDisplay;

  const animalSlot = elementUnder?.closest('.animal-slot');
  const plotEl = elementUnder?.closest('.farm-plot');

  $$('.animal-slot.highlight-drop').forEach(s => {
    if (s !== animalSlot) s.classList.remove('highlight-drop');
  });
  $$('.farm-plot.highlight-drop').forEach(p => {
    if (p !== plotEl) p.classList.remove('highlight-drop');
  });

  if (animalSlot) animalSlot.classList.add('highlight-drop');
  if (plotEl) plotEl.classList.add('highlight-drop');
}

function clearDropHighlights() {
  $$('.animal-slot.highlight-drop').forEach(s => s.classList.remove('highlight-drop'));
  $$('.farm-plot.highlight-drop').forEach(p => p.classList.remove('highlight-drop'));
}

// ===== DRAG & DROP 系統（同時支援 Pointer 事件與原生 HTML5 拖曳） =====
let dragData = null;

function setupDragDrop() {
  let activeDrag = null; // { itemId, slot, startX, startY, isDragging }

  function startDragVisual(itemId, clientX, clientY) {
    const def = ALL_ITEMS[itemId];
    if (!def) return;
    isDraggingItem = true;
    document.body.classList.add('is-dragging-item');
    els.dragGhost.innerHTML = `<img src="${def.img}" alt="${def.name}" class="drag-ghost-img">`;
    els.dragGhost.classList.add('visible');
    els.dragGhost.style.left = `${clientX}px`;
    els.dragGhost.style.top = `${clientY}px`;
  }

  function moveDragVisual(clientX, clientY) {
    els.dragGhost.style.left = `${clientX}px`;
    els.dragGhost.style.top = `${clientY}px`;
    updateDropHighlight(clientX, clientY);
  }

  function endDragVisual() {
    isDraggingItem = false;
    document.body.classList.remove('is-dragging-item');
    els.dragGhost.classList.remove('visible');
    clearDropHighlights();
    $$('.inv-slot.dragging').forEach(s => s.classList.remove('dragging'));
  }

  // --- 1. Pointer 事件拖曳（滑鼠 / 觸控通用的高相容機制） ---
  document.addEventListener('pointerdown', (e) => {
    const slot = e.target.closest('.inv-slot');
    if (!slot || slot.classList.contains('empty')) return;
    if (!els.invPanel.classList.contains('open')) return;

    const itemId = slot.dataset.itemId;
    if (!ALL_ITEMS[itemId]) return;

    activeDrag = {
      itemId,
      slot,
      startX: e.clientX,
      startY: e.clientY,
      isDragging: false
    };
  });

  window.addEventListener('pointermove', (e) => {
    if (!activeDrag) return;

    if (!activeDrag.isDragging) {
      const dist = Math.hypot(e.clientX - activeDrag.startX, e.clientY - activeDrag.startY);
      if (dist > 5) {
        activeDrag.isDragging = true;
        activeDrag.slot.classList.add('dragging');
        startDragVisual(activeDrag.itemId, e.clientX, e.clientY);
      }
    }

    if (activeDrag.isDragging) {
      moveDragVisual(e.clientX, e.clientY);
    }
  });

  window.addEventListener('pointerup', (e) => {
    if (!activeDrag) return;

    if (activeDrag.isDragging) {
      executeItemDrop(activeDrag.itemId, e.clientX, e.clientY);
      endDragVisual();
      updateInventoryPanel();
    }
    activeDrag = null;
  });

  window.addEventListener('pointercancel', () => {
    if (activeDrag && activeDrag.isDragging) {
      endDragVisual();
    }
    activeDrag = null;
  });

  // --- 2. 原生 HTML5 Drag & Drop 補強 ---
  document.addEventListener('dragstart', (e) => {
    const slot = e.target.closest('.inv-slot');
    if (!slot || slot.classList.contains('empty')) {
      e.preventDefault();
      return;
    }

    const itemId = slot.dataset.itemId;
    const def = ALL_ITEMS[itemId];
    if (!def) { e.preventDefault(); return; }

    dragData = { itemId, source: 'inventory' };
    try {
      e.dataTransfer.setData('text/plain', itemId);
      e.dataTransfer.effectAllowed = 'move';
      // 設置透明幽靈圖案以使用自訂幽靈視覺
      const emptyImg = new Image();
      emptyImg.src = 'data:image/gif;base64,R0lGODlhAQABAIAAAAUEBAAAACwAAAAAAQABAAACAkQBADs=';
      e.dataTransfer.setDragImage(emptyImg, 0, 0);
    } catch (err) {}

    slot.classList.add('dragging');
    startDragVisual(itemId, e.clientX, e.clientY);
  });

  document.addEventListener('dragover', (e) => {
    if (!dragData) return;
    e.preventDefault();
    if (e.dataTransfer) {
      e.dataTransfer.dropEffect = 'move';
    }
    if (e.clientX !== 0 || e.clientY !== 0) {
      moveDragVisual(e.clientX, e.clientY);
    }
  });

  document.addEventListener('drop', (e) => {
    if (!dragData) return;
    e.preventDefault();
    executeItemDrop(dragData.itemId, e.clientX, e.clientY);
    endDragVisual();
    dragData = null;
    updateInventoryPanel();
  });

  document.addEventListener('dragend', () => {
    endDragVisual();
    dragData = null;
  });
}

// ===== TOOLTIP =====
function showItemTooltip(def, count, event) {
  const tt = els.tooltip;
  tt.querySelector('.item-tooltip-title').innerHTML = `
    <img src="${def.img}" style="width:24px; height:24px; object-fit:contain; vertical-align:middle; margin-right:6px;">
    ${def.name}
  `;
  tt.querySelector('.item-tooltip-desc').textContent = `${def.desc || ''}\n數量：${count}`;
  tt.style.left = `${event.clientX + 15}px`;
  tt.style.top = `${event.clientY - 10}px`;
  tt.classList.add('visible');
}

function hideItemTooltip() {
  els.tooltip.classList.remove('visible');
}

// ===== HUD =====
function updateHUD() {
  els.hudDay.textContent = `第 ${gameState.day} 天`;
  els.hudCoins.textContent = gameState.coins;
  if (els.shopCoins) {
    els.shopCoins.textContent = gameState.coins;
  }
}

// ===== TOAST NOTIFICATIONS =====
let toastTimeout = null;

function showToast(message, type = 'success') {
  // Remove existing toasts
  document.querySelectorAll('.toast').forEach(t => t.remove());

  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.textContent = message;
  document.body.appendChild(toast);

  clearTimeout(toastTimeout);
  toastTimeout = setTimeout(() => {
    toast.remove();
  }, 2600);
}

// ===== PARTICLE EFFECTS =====
function spawnParticles(targetEl, emojis = ['✨']) {
  const rect = targetEl.getBoundingClientRect();
  const cx = rect.left + rect.width / 2;
  const cy = rect.top + rect.height / 2;

  for (let i = 0; i < 6; i++) {
    const p = document.createElement('div');
    p.className = 'particle';
    p.textContent = emojis[Math.floor(Math.random() * emojis.length)];
    p.style.left = `${cx}px`;
    p.style.top = `${cy}px`;
    p.style.setProperty('--px', `${(Math.random() - 0.5) * 120}px`);
    p.style.setProperty('--py', `${-30 - Math.random() * 80}px`);
    document.body.appendChild(p);
    setTimeout(() => p.remove(), 1000);
  }
}

function showWaterAnimation(plotEl) {
  const rect = plotEl.getBoundingClientRect();
  for (let i = 0; i < 5; i++) {
    const drop = document.createElement('div');
    drop.className = 'water-drop';
    drop.textContent = '💧';
    drop.style.position = 'fixed';
    drop.style.left = `${rect.left + Math.random() * rect.width}px`;
    drop.style.top = `${rect.top}px`;
    drop.style.animationDelay = `${i * 0.1}s`;
    drop.style.zIndex = '400';
    document.body.appendChild(drop);
    setTimeout(() => drop.remove(), 700);
  }
}

// ===== SAVE / LOAD =====
function saveGame() {
  const saveData = {
    day: gameState.day,
    coins: gameState.coins,
    inventory: { ...gameState.inventory },
    plots: gameState.plots.map(p => ({
      planted: p.planted,
      watered: p.watered,
      stage: p.stage,
      growStart: p.growStart
    })),
    animals: gameState.animals.map(a => ({
      happiness: a.happiness,
      fedToday: a.fedToday
    })),
    sceneX: gameState.sceneX
  };

  try {
    localStorage.setItem('farmGame_save', JSON.stringify(saveData));
    // Show save indicator
    els.saveIndicator.classList.add('show');
    setTimeout(() => els.saveIndicator.classList.remove('show'), 1500);
  } catch (e) {
    console.warn('Save failed:', e);
  }
}

function loadGame() {
  try {
    const raw = localStorage.getItem('farmGame_save');
    if (raw) {
      const data = JSON.parse(raw);

      gameState.day = data.day || 1;
      gameState.coins = data.coins || 0;
      gameState.sceneX = data.sceneX || 0;

      // Merge inventory
      if (data.inventory) {
        Object.keys(data.inventory).forEach(key => {
          gameState.inventory[key] = data.inventory[key];
        });
      }

      // Restore plots
      if (data.plots) {
        data.plots.forEach((saved, idx) => {
          if (idx < gameState.plots.length) {
            gameState.plots[idx].planted = saved.planted;
            gameState.plots[idx].watered = saved.watered;
            gameState.plots[idx].stage = saved.stage;
            gameState.plots[idx].growStart = saved.growStart;
          }
        });
      }

      // Restore animals
      if (data.animals) {
        data.animals.forEach((saved, idx) => {
          if (idx < gameState.animals.length) {
            gameState.animals[idx].happiness = saved.happiness;
            gameState.animals[idx].fedToday = saved.fedToday;
          }
        });
      }
    }

    // 確保有基礎動物食物可供餵食
    if ((gameState.inventory.wheat_crop || 0) <= 0 && (gameState.inventory.hay || 0) <= 0) {
      gameState.inventory.wheat_crop = 5;
      gameState.inventory.hay = 5;
    }
    if ((gameState.inventory.carrot_crop || 0) <= 0) {
      gameState.inventory.carrot_crop = 3;
    }

  } catch (e) {
    console.warn('Load failed:', e);
  }
}
