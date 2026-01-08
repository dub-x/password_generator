import { Button, Checkbox, Divider, InputNumber, List } from "antd";
import { useState } from "react";
import { Container, Header } from "./index.styles";
import VirtualList from "rc-virtual-list";
import { CheckboxValueType } from "antd/es/checkbox/Group";
import { CheckboxChangeEvent } from "antd/es/checkbox";

const CheckboxGroup = Checkbox.Group;

const plainOptions = ["0-9", "a-z", "A-Z"];
const Alphabet = {
  "0-9": "0123456789",
  "a-z": "qwertyuiopasdfghjklmnbvcxz",
  "A-Z": "qwertyuiopasdfghjklmnbvcxz".toUpperCase(),
};

const App = () => {
  const [checkedList, setCheckedList] = useState<CheckboxValueType[]>();
  const [indeterminate, setIndeterminate] = useState<boolean>(false);
  const [checkAll, setCheckAll] = useState<boolean>(false);
  const [counter, setCounter] = useState<number>(10);

  const [data, setData] = useState<string[]>([]);

  const onChange = (list: CheckboxValueType[]) => {
    setCheckedList(list);
    setIndeterminate(!!list.length && list.length < plainOptions.length);
    setCheckAll(list.length === plainOptions.length);
  };

  const onCheckAllChange = (e: CheckboxChangeEvent) => {
    setCheckedList(e.target.checked ? plainOptions : []);
    setIndeterminate(false);
    setCheckAll(e.target.checked);
  };

  const onClick = () => {
    if (counter > 0 && checkedList?.length) {
      let pas = "";
      let A = "";
      checkedList.forEach((el) => {
        // @ts-ignore
        A += Alphabet[el];
      });
      for (let i = 0; i < counter; i++) {
        pas += A.charAt(Math.floor(Math.random() * A.length));
      }
      setData((prev) => [...prev, pas]);
    }
  };

  return (
    <Container>
      <Divider>Генератор паролей</Divider>
      <List
        header={
          <Header>
            <div>
              <Checkbox
                indeterminate={indeterminate}
                onChange={onCheckAllChange}
                checked={checkAll}
              >
                Все
              </Checkbox>
              <CheckboxGroup
                options={plainOptions}
                value={checkedList}
                onChange={onChange}
              />
              <InputNumber
                size={"small"}
                min={0}
                max={100}
                value={counter}
                onChange={(value) => setCounter(value)}
              />
            </div>
            <Button type="primary" onClick={onClick} block>
              Сгенерировать
            </Button>
          </Header>
        }
        bordered
      >
        <VirtualList data={data} height={320} itemHeight={30} itemKey="id">
          {(item) => <List.Item>{item}</List.Item>}
        </VirtualList>
      </List>
    </Container>
  );
};

export default App;
