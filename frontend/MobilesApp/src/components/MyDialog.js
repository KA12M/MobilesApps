import React from "react";
import { Text } from "react-native";
import { Button, Dialog, Portal } from "react-native-paper";

const MyDialog = ({
  title,
  content,
  open,
  setDialog,
  onPress,
  tips = null,
}) => {
  return (
    <Portal>
      <Dialog
        style={{
          backgroundColor: "white",
        }}
        visible={open}
        onDismiss={setDialog}
      >
        <Dialog.Title>{title}</Dialog.Title>
        <Dialog.Content>
          <Text variant="bodyLarge">ยืนยันที่จะ{content}ไหม</Text>
        </Dialog.Content>
        {tips && (
          <Dialog.Content>
            <Text variant="bodyLarge">{tips}</Text>
          </Dialog.Content>
        )}
        <Dialog.Actions>
          <Button onPress={setDialog}>ยกเลิก</Button>
          <Button onPress={onPress}>ยืนยัน</Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
};

export default MyDialog;
