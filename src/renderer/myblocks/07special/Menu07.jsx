import PlayGround, { Block, Value, Field, Shadow, Category } from '../../components/PlayGround';

export default function Menu07() {
  return (
    <Category name="特殊">
      <Block type="b_special_autotime">
      </Block>
      <Block type="b_special_breakpoint">
      </Block>
      <Block type="b_special_command">
        <Value name="val1"><Shadow type="text" /></Value>
      </Block>
      <Block type="b_special_jump">
        <Value name="val1"><Shadow type="text" /></Value>
      </Block>
      <Block type="b_special_switch">
        <Value name="val1"><Shadow type="text" /></Value>
      </Block>
      <Block type="b_special_target">
        <Value name="val1"><Shadow type="text" /></Value>
      </Block>
      <Block type="b_special_targets">
      </Block>
      <Block type="b_special_wait">
      </Block>
    </Category>
  )
}
