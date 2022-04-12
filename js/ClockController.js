class ClockController {
    setModel(model) {
        this.clockModal = model;
    }
    setView(view) {
        this.clockView = view;
    }
    reversArrows() {
        this.clockModal.reversArrows = !this.clockModal.reversArrows;
    }

    boost() {
        this.clockModal.speedRotatinArrows += 1000;
        if (this.clockModal.speedRotatinArrows > 0 && this.clockModal.reversArrows != false) {
            this.reversArrows();
        }
    }

    reduce() {
        this.clockModal.speedRotatinArrows -= 1000;
        if (this.clockModal.speedRotatinArrows < 0 && this.clockModal.reversArrows != true) {
            this.reversArrows();
        }
    }
}

export { ClockController };