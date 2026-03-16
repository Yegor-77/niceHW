class CountdownTimer {
  constructor({ selector, targetDate }) {
    this.timer = document.querySelector(selector);
    this.targetDate = targetDate;

    this.refs = {
      days: this.timer.querySelector('[data-value="days"]'),
      hours: this.timer.querySelector('[data-value="hours"]'),
      mins: this.timer.querySelector('[data-value="mins"]'),
      secs: this.timer.querySelector('[data-value="secs"]'),
    };

    this.start();
  }

  start() {
    this.update();
    this.intervalId = setInterval(() => this.update(), 1000);
  }

  update() {
    const currentTime = Date.now();
    const time = this.targetDate - currentTime;

    if (time <= 0) {
      clearInterval(this.intervalId);
      this.updateTimer({ days: 0, hours: 0, mins: 0, secs: 0 });
      return;
    }

    const days = Math.floor(time / (1000 * 60 * 60 * 24));
    const hours = Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const mins = Math.floor((time % (1000 * 60 * 60)) / (1000 * 60));
    const secs = Math.floor((time % (1000 * 60)) / 1000);

    this.updateTimer({ days, hours, mins, secs });
  }

  updateTimer({ days, hours, mins, secs }) {
    this.refs.days.textContent = days;
    this.refs.hours.textContent = this.pad(hours);
    this.refs.mins.textContent = this.pad(mins);
    this.refs.secs.textContent = this.pad(secs);
  }

  pad(value) {
    return String(value).padStart(2, "0");
  }
}

document.addEventListener("DOMContentLoaded", () => {
  new CountdownTimer({
    selector: "#timer-1",
    targetDate: new Date("Jul 17, 2026"),
  });
});
