class Puissance4{

    constructor(arrayPlayer){
        this.rows = 6
        this.cols = 7
        this.game = document.querySelector('#game');
        this.joueurs = arrayPlayer
        this.joueurTurn = this.joueurs[0]
        this.gameBoard()
        this.listener()
    }

    gameBoard(){
    
        for (let col = 0; col < this.cols; col++) {
            let gameCol = document.createElement("div")

            this.game.appendChild(gameCol)
            gameCol.classList.add('col')
            gameCol.setAttribute('data-col', col)

            for (let row = 1; row < this.cols; row++) {
                let gameRow = document.createElement("div")
                gameCol.appendChild(gameRow)
                gameRow.classList.add('row', 'row-empty')
                gameRow.setAttribute('data-row', row)
            }
        }
    }

    listener(){

      const game = this.game
      let gameCols = document.querySelectorAll('.col');

      gameCols.forEach(function (col){
          col.addEventListener('click',function(e){

          })
      })
      this.game.addEventListener('click', (event)=>{
        // console.log(event.target.parentNode);
        // console.log(event.target.parentNode.children.length)
          for (let i = event.target.parentNode.children.length -1 ; i >=0 ; i--) {
              if (event.target.parentNode.children[i].classList.contains('row-empty')){
                  event.target.parentNode.children[i].classList.remove('row-empty')
                  event.target.parentNode.children[i].classList.add(this.joueurTurn.getColor())
                  this.checkWin(event.target.parentNode.children[i])
                  this.switchPlayer()
                  return
              }
          }
      })
  }

  switchPlayer(){

    if (this.joueurTurn == this.joueurs[0]){
        this.joueurTurn = this.joueurs[1]
    }else {
        this.joueurTurn = this.joueurs[0]
    }
  }

  checkWin(divJouer){


    this.checkVertical(divJouer)
  }

  checkVertical(divJouer){
    let count = 1
    let idDivJouer = divJouer.getAttribute('data-row')-1
    let col = divJouer.parentNode.children

    while(col[idDivJouer +1] !== undefined){
      if(col[idDivJouer +1].classList.contains(this.joueurTurn.getColor()) == divJouer.classList.contains(this.joueurTurn.getColor())){
        console.log("good +1")
        count++
        divJouer = col[idDivJouer +1]
        idDivJouer = divJouer.getAttribute('data-row')-1
        if (count === 4) {
          return console.log('WINNERRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRR')
        }
      }else{
        console.log('pas de la meme couleur en dessous, reset du compteur')
        count = 1
        break
      }
    }
  }

  checkHorizontal(divJouer){
    let count = 1
    let idDivJouer = divJouer.getAttribute('data-row')-1
    let col = divJouer.parentNode.children

    while(col[idDivJouer +1] !== undefined){
      if(col[idDivJouer +1].classList.contains(this.joueurTurn.getColor()) == divJouer.classList.contains(this.joueurTurn.getColor())){
        console.log("good +1")
        count++
        divJouer = col[idDivJouer +1]
        idDivJouer = divJouer.getAttribute('data-row')-1
        if (count === 4) {
          return console.log('WINNERRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRR')
        }
      }else{
        console.log('pas de la meme couleur en dessous, reset du compteur')
        count = 1
        break
      }
    }
  }
    /*
    
    
    if (col[idDivJouer +1] !== undefined ) {
      console.log(col[idDivJouer +1])
      if (col[idDivJouer +1].classList.contains(this.joueurTurn.getColor()) == divJouer.classList.contains(this.joueurTurn.getColor()) ) {
          console.log("good +1")
          count++
          divJouer = col[idDivJouer +1]
          idDivJouer = divJouer.getAttribute('data-row')-1

          if (col[idDivJouer +1] !== undefined ) {
            console.log(col[idDivJouer +1])
            if (col[idDivJouer +1].classList.contains(this.joueurTurn.getColor()) == divJouer.classList.contains(this.joueurTurn.getColor()) ) {
                console.log("good +1")
                count++
                divJouer = col[idDivJouer +1]
                idDivJouer = divJouer.getAttribute('data-row')-1
      
                if (col[idDivJouer +1] !== undefined ) {
                  console.log(col[idDivJouer +1])
                  if (col[idDivJouer +1].classList.contains(this.joueurTurn.getColor()) == divJouer.classList.contains(this.joueurTurn.getColor()) ) {
                      console.log("good +1")
                      count++
                     if (count == 4) {
                       console.log('WINNERRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRR')
                     }
            
                     
            
                  }else{
                    console.log('pas de la meme couleur en dessous')
                    count = 1
                  }
                  
                }
      
            }else{
              console.log('pas de la meme couleur en dessous')
              count = 1

            }
            
          }

      }else{
        console.log('pas de la meme couleur en dessous')
        count = 1

      }
      
    }
    console.log(col)
    // let count = 0;
    //   for(let i=0; i< this.cols; i++){

    //     for(let j=0; j<this.rows; j++){

    //       console.log("ROW HERE",this.row);

    //       if(j== this.joueurTurn.getColor()){

    //         console.log("COLOR HERE",this.joueurTurn.getColor())
    //         count++;
    //       }
    //     }
    //     console.log("COL HERE",this.cols);
    //   }

    */
}