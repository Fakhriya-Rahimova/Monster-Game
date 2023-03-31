const app = Vue.createApp({
  data(){
    return {
      playerHealth: 100,
      monsterHealth: 100,
      currentRound: 0,
      winner: null
    }

  },

  watch: {
    playerHealth(value){
      if(this.monsterHealth <= 0 && value <= 0){
        this.winner = "draw"
      }else if(value <= 0){
        this.winner = "monster"
        return { width: '0%' };
      }
    },

    monsterHealth(value){
      if(this.playerHealth <= 0 && value <= 0){
        this.winner = "draw"
      }else if(value <= 0){
        this.winner = "player"
        return { width: '0%' };
      }
    },
  },

  methods: {
    startGame(){
      this.playerHealth = 100,
      this.monsterHealth = 100,
      this.winner = null,
      this.currentRound = 0
    },

    attackMonster() {
      this.currentRound += 1
      const attackValue = Math.floor(Math.random() * (12-5)) + 5
      this.monsterHealth = this.monsterHealth - attackValue;
      this.attackPlayer();

    },

    attackPlayer(){
      const attackValue = Math.floor(Math.random() * (20-5)) + 5
      this.playerHealth = this.playerHealth - attackValue
    },

    specialAttackMonster() {
      this.currentRound += 1
      const attackValue = Math.floor(Math.random() * (25-10)) + 10;
      this.monsterHealth -= attackValue;
      this.attackPlayer()
    },

    healPlayer() {
      this.currentRound++;
      const healValue = Math.floor(Math.random() * (20-8)) + 8;
      if (this.playerHealth + healValue > 100){
        this.playerHealth = 100;
      }else {
         this.playerHealth += healValue;
      }
      this.attackPlayer();
    },

    surrender(){
      this.winner = 'monster'
      return {width: '0%'}
    }
  }
});
 app.mount('#game')
