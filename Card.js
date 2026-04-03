class Card {
    constructor(data, game) {
        this.word = data.word;
        this.type = data.type;
        this.game = game;
        this.flipped = false;

        this.element = document.createElement("div");
        this.element.classList.add("card");

        const content = document.createElement("div");
        content.classList.add("card-content");

        const wordEl = document.createElement("div");
        wordEl.classList.add("word");
        wordEl.innerText = this.word;

        const typeEl = document.createElement("div");
        typeEl.classList.add("type");
        typeEl.innerText = this.type;

        content.appendChild(wordEl);
        content.appendChild(typeEl);

        this.element.appendChild(content);

        this.element.addEventListener("click", () => this.handleClick());
    }

    handleClick() {
        if (this.flipped || this.game.lockBoard) return;

        this.flip();

        if (!this.game.firstCard) {
            this.game.firstCard = this;
        } else {
            this.game.secondCard = this;
            this.game.lockBoard = true;
            this.game.checkMatch();
        }
    }

    flip() {
        this.flipped = true;
        this.element.classList.add("flipped");
    }

    flipBack() {
        this.flipped = false;
        this.element.classList.remove("flipped");
    }

    setMatched() {
        this.element.classList.add("matched");
    }
}