import DS from 'ember-data';

export default DS.ActiveModelSerializer.extend({
  attrs: {
    created_at: {serialize: false},
    updated_at: {serialize: false}
  }
});
