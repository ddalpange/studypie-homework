<template>
  <div>
    <button class="square square--large square--outline" v-on:click="toggle()">
      +
    </button>
    <div class="square square--large square--primary" v-if="toggled">
      <input type="text" class="square__input" v-model="text" />
    </div>
    <div class="button-group" v-if="toggled">
      <button class="button" v-on:click="reset()">
        삭제
      </button>
      <button class="button" v-on:click="submit()">
        완료
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "AddSchedule",
  props: {
    addSchedule: Function,
  },
  data() {
    return {
      toggled: false,
      text: "",
    };
  },
  methods: {
    reset() {
      this.toggled = false;
      this.text = "";
    },
    submit() {
      this.addSchedule(this.text);
      this.reset();
    },
    toggle() {
      this.toggled = !this.toggled;
    },
  },
};
</script>

<style></style>
