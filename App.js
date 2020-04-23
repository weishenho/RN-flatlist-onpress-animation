import React, { Component } from "react";
import {
  View,
  Text,
  Picker,
  SafeAreaView,
  StyleSheet,
  Button,
  FlatList,
  TouchableOpacity,
  Animated,
  Easing,
  TouchableHighlight,
  Alert
} from "react-native";

export default class App extends Component {
  static navigationOptions = {
    header: null,
  };


  constructor(props) {
    super(props);
    this.selectedBGWidth = new Animated.Value(0);
    this.highlightwidth = 0;
    this.state = {
      selectedItem: "",
      items: [
        {title:"title 1", subtitle:"subtitle 1"},
        {title:"title 2", subtitle:"subtitle 2"},
        {title:"title 3", subtitle:"subtitle 3"},
        {title:"title 4", subtitle:"subtitle 4"},
        {title:"title 5", subtitle:"subtitle 5"},
        {title:"title 6", subtitle:"subtitle 6"},
        {title:"title 7", subtitle:"subtitle 7"},
        {title:"title 8", subtitle:"subtitle 8"},
        {title:"title 9", subtitle:"subtitle 9"},
        {title:"title 10", subtitle:"subtitle 10"},
      ]
    };
  
  }

  renderSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          backgroundColor: "#CED0CE"
        }}
      />
    );
  };

  animateHighlightSelected = () => {
    this.selectedBGWidth.setValue(0);
    Animated.timing(this.selectedBGWidth, {
      toValue: 1,
      duration: 200,
      easing: Easing.in(Easing.quad)
    }).start();
  };




  renderItem = ({ item }) => {
    const selected = this.state.selectedItem == item;
    return (
      <TouchableOpacity style={styles.item}
        onLayout={
          (event) => {
            if (this.highlightwidth == 0) {
              this.highlightwidth = event.nativeEvent.layout.width;
            }
          }
        }
        onPress={
          () => {
            this.setState({ selectedItem: item });
            this.animateHighlightSelected();
          }
        }
      >
        {
          selected ? (
            <Animated.View
              style={{
                position: "absolute",
                top: 0,
                bottom: 0,
                left: 0,
                right: 0,
                backgroundColor: "#96b3ce",
                zIndex: -2,
                overflow:"hidden",
                width: this.selectedBGWidth.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, this.highlightwidth]
                })
              }}></Animated.View >
          ) : null}

        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.subtitle}>{item.subtitle}</Text>
      </TouchableOpacity >
    );
  };

  render() {
    return (
      <SafeAreaView style={{ flex:1, justifyContent:"center", alignItems:"center", backgroundColor:"#f2f2f2" }}>

        <View
          style={{

            margin: 12,
            borderColor: "#e5e6eb",
            backgroundColor: "#f8f8fa",
            zIndex: 1,
            shadowColor: "rgba(0,0,0, .4)",
            shadowOffset: { width: 1, height: 1 },
            shadowOpacity: 0.8,
            shadowRadius: 1,
            elevation: 5,
            height: 340,
            width:250
          }}>

          <FlatList
            data={this.state.items}
            renderItem={this.renderItem}
            keyExtractor={(_, idx) => "domain" + idx}
            ItemSeparatorComponent={this.renderSeparator}
            bounces={false}
            showsVerticalScrollIndicator={false}
          />
        </View>

      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  item: {
    padding: 12,
    zIndex: -1,
    overflow: "hidden"
  },
  title: {
    fontSize: 14,
    color: "#222",
    fontWeight: "bold",
    overflow: "hidden",
    zIndex: -1
  },
  subtitle: {
    fontSize: 11,
    color: "#70757a",
    overflow: "hidden",
    zIndex: -1
  }
});