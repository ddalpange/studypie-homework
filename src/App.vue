<template>
  <div id="app">
    <header class="header">
      <button class="header__button header__button--left">왼</button>
      <div class="header__title">
        <div class="header__title__year">{{ currentDate | headerYear }}</div>
        <div class="header__title__date">{{ currentDate | headerDate }}</div>
      </div>
      <button class="header__button header__button--right">오</button>
    </header>
    <main class="main">
      <section class="section">
        <strong class="section__title"
          >할 일 ({{ notCompletedSchedules.length }})</strong
        >
        <article class="section__body">
          <button class="square square--large square--outline">+</button>

          <button
            v-for="schedule in notCompletedSchedules"
            v-bind:key="schedule.text"
            class="square square--large square--primary"
          >
            {{ schedule.text }}
          </button>
          <input class="square square--large square--primary" />
        </article>
      </section>
      <section class="section">
        <strong class="section__title"
          >끝난 일 ({{ completedSchedules.length }})</strong
        >
        <article class="section__body">
          <button class="square square--large square--outline">+</button>

          <button
            v-for="schedule in completedSchedules"
            v-bind:key="schedule.text"
            class="square square--large square--primary"
          >
            {{ schedule.text }}
          </button>
          <input class="square square--large square--primary" />
        </article>
      </section>
    </main>
  </div>
</template>
<script>
import { format, isSameDay } from "date-fns";
export default {
  name: "App",
  components: {},
  data() {
    return {
      currentDate: new Date("2020-07-25"),
      schedules: [
        {
          date: new Date("2020-07-25"),
          text: "Hello..",
          completed: false,
        },
        {
          date: new Date("2020-07-25"),
          text: "Hello..",
          completed: true,
        },
      ],
    };
  },
  computed: {
    currentSchedules() {
      return this.schedules.filter((schedule) =>
        isSameDay(schedule.date, this.currentDate)
      );
    },
    completedSchedules() {
      return this.currentSchedules.filter(
        (schedule) => schedule.completed === true
      );
    },
    notCompletedSchedules() {
      return this.currentSchedules.filter(
        (schedule) => schedule.completed === false
      );
    },
  },
  filters: {
    headerYear(date) {
      return format(date, "yyyy");
    },
    headerDate(date) {
      return format(date, "MM-dd (iiiiii)");
    },
  },
};
</script>

<style>
@import url("./reset.css");

#app {
  font-family: "Noto Sans KR", sans-serif;
}

.header {
  display: flex;
  align-items: center;
  height: 60px;
}

.header__title {
  flex: 1;
  text-align: center;
}
.header__button {
  font-size: 20px;
  background: none;
  outline: none;
  border: none;
}
.header__title__year {
  font-size: 15px;
}
.header__title__date {
  font-size: 17px;
}

.main {
  padding: 0 16px;
}

.section__title {
  display: block;
  margin-top: 16px;
  margin-bottom: 16px;
}

.section__body {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.square {
  margin-bottom: 16px;
  border: none;
  background: none;
  text-align: center;
}

.square--large {
  display: block;
  height: 68px;
  border-radius: 12px;
  font-size: 17px;
}

.square--outline {
  border: solid 1px black;
}

.square--primary {
  background: #5aaafa;
  color: white;
}

.square--primary:hover {
  background: #081f5c;
}
</style>
