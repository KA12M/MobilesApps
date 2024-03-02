import React from "react";
import { Text } from "react-native";
import { Button, Dialog, Portal } from "react-native-paper";

const MyDialog = ({ open, setDialog, onPress }) => {
  return (
    <Portal>
      <Dialog
        style={{
          backgroundColor: "white",
        }}
        visible={open}
        onDismiss={setDialog}
      >
        <Dialog.Title>ออกจากระบบ</Dialog.Title>
        <Dialog.Content>
          <Text variant="bodyLarge">ยืนยันที่จะออกจากระบบไหม</Text>
        </Dialog.Content>
        <Dialog.Actions>
          <Button onPress={setDialog}>ยกเลิก</Button>
          <Button onPress={onPress}>ยืนยัน</Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
};

export default MyDialog;
