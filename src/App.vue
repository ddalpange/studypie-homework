<template>
  <div id="app">
    <header class="header">
      <button
        class="header__button header__button--left"
        @click="changeCurrentDate(-1)"
      >
        &larr;
      </button>
      <div class="header__title">
        <div class="header__title__year">{{ currentDate | headerYear }}</div>
        <div class="header__title__date">{{ currentDate | headerDate }}</div>
      </div>
      <button
        class="header__button header__button--right"
        @click="changeCurrentDate(+1)"
      >
        &rarr;
      </button>
    </header>
    <main class="main">
      <section class="section">
        <strong class="section__title"
          >할 일 ({{
            currentSchedules.filter((schedule) => !schedule.completed).length
          }})</strong
        >
        <article class="section__body">
          <AddSchedule :addSchedule="addSchedule" />
          <template v-for="schedule in currentSchedules">
            <Schedule
              v-if="!schedule.completed"
              :key="schedule.text"
              :schedule="schedule"
              :completeSchedule="completeSchedule"
              :removeSchedule="removeSchedule"
              :editSchedule="editSchedule"
            />
          </template>
        </article>
      </section>
      <section class="section">
        <strong class="section__title"
          >끝난 일 ({{
            currentSchedules.filter((schedule) => schedule.completed).length
          }})</strong
        >
        <article class="section__body">
          <template v-for="schedule in currentSchedules">
            <Schedule
              v-if="schedule.completed"
              :key="schedule.text"
              :schedule="schedule"
            />
          </template>
        </article>
      </section>
    </main>
  </div>
</template>
<script>
import { format, isSameDay, addDays } from "date-fns";
import Schedule from "./components/Schedule";
import AddSchedule from "./components/AddSchedule";
import { LocalStorage } from "./utils/LocalStorage";

const SCHEDULES_KEY = "SCHEDULES";

export default {
  name: "App",
  use: {},
  components: {
    Schedule,
    AddSchedule,
  },
  data() {
    return {
      currentDate: new Date(),
      schedules: LocalStorage.getItem(SCHEDULES_KEY, []).map((schedule) => {
        schedule.date = new Date(schedule.date);
        return schedule;
      }),
    };
  },
  methods: {
    changeCurrentDate(delta) {
      this.currentDate = addDays(this.currentDate, delta);
    },
    addSchedule(text) {
      this.schedules.push({
        text,
        date: this.currentDate,
        completed: false,
        priority: 0,
      });
    },
    completeSchedule(schedule) {
      this.editSchedule(schedule, { completed: true });
    },
    editSchedule(schedule, nextSchedule) {
      this.$set(
        this.schedules,
        this.schedules.findIndex((s) => s.text === schedule.text),
        {
          ...schedule,
          ...nextSchedule,
        }
      );
    },
    removeSchedule(schedule) {
      this.$delete(
        this.schedules,
        this.schedules.findIndex((s) => s.text === schedule.text)
      );
    },
  },
  watch: {
    schedules(value) {
      LocalStorage.setItem(SCHEDULES_KEY, value);
    },
  },
  computed: {
    currentSchedules() {
      return this.schedules.filter((schedule) =>
        isSameDay(schedule.date, this.currentDate)
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
}

/* TODO: Directive */
.square {
  margin-bottom: 16px;
  border: none;
  background: none;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
}

.square__input {
  border: none;
  background: transparent;
  color: white;
  font-size: inherit;
}

.square--large {
  width: 100%;
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

.square--disabled {
  background: #969dab;
  color: white;
  text-decoration: line-through;
}

.button-group {
  display: flex;
  justify-content: space-around;
  margin-bottom: 16px;
}

.button {
  color: #007aff;
  background: #eeeeee;
  border-radius: 8px;
  padding: 16px 24px;
  border: none;
}
</style>
