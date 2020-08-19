<template>
  <div>
    <button
      class="square square--large"
      :class="{
        'square--primary': !schedule.completed,
        'square--disabled': schedule.completed,
      }"
      @click="!schedule.completed ? (toggled = true) : undefined"
    >
      <span v-if="!toggled">{{ schedule.text }}</span>
      <input type="text" class="square__input" v-if="toggled" v-model="text" />
    </button>

    <div class="button-group" v-if="toggled">
      <button class="button" @click="toggled = false">
        취소
      </button>
      <button class="button" @click="removeSchedule(schedule)">
        삭제
      </button>
      <button class="button" @click="submit()">
        완료
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "Schedule",
  components: {},
  props: {
    schedule: {
      date: Date,
      text: String,
      completed: Boolean,
    },
    completeSchedule: Function,
    removeSchedule: Function,
    editSchedule: Function,
  },
  methods: {
    submit() {
      if (this.text !== this.schedule.text) {
        this.editSchedule(this.schedule, { text: this.text });
      } else {
        this.completeSchedule(this.schedule);
      }
      this.toggled = false;
    },
  },
  data() {
    return {
      toggled: false,
      text: this.schedule.text,
    };
  },
};
</script>

<style></style>
