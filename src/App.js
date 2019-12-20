import React, { Component } from "react";
import "./App.css";
import BinarySearchTree from "./Coursework";
import Button from "./Button";
import treeify from "treeify";
import search from "./search.png";
import { TextInput,View, Image } from "react-native";

class App extends Component {
  constructor(){
    super();
    this.state = {
      searchText: "name",
      dataList: "",
      trees: []
    };
  }

onSubmit(json, keys) {
  let t = {}, newTree;
  for (let [key, value] of Object.entries(keys)){
    newTree = new BinarySearchTree();
      if (!t.hasOwnProperty(key)) {
        t[key] = new BinarySearchTree();
      }
      newTree.root = value;
      t[key].push(newTree);
    }

    for (let [name, obj] of Object.entries(json)) {
      t['name'].push(name);
      for (let key in obj) {
        if (!t.hasOwnProperty(key)) {
          t[key] = new BinarySearchTree();
        }
           t[key].push(obj[key], name);
      }
    }

    for (let [key, value] of Object.entries(t)){
      t[key] = value.doBalanced();
    }
    this.setState({trees: t});
    console.log("keys",Object.keys(this.state.trees));
    return t;
 }
  onSubmit1(json, trees) {
    let keys = {'name': new BinarySearchTree(), 'main': new BinarySearchTree()};
      for (let [name, obj] of Object.entries(json)) {
        (keys['main']).push(`${name}:${Object.entries(obj)}`);
        (keys['name']).push(name);
        for (let key in obj) {
          if (!keys.hasOwnProperty(key)) {
            keys[key] = new BinarySearchTree();
          }
             keys[key].push(obj[key], name);
        }
      }
      for (let [key, value] of Object.entries(keys)){
        keys[key] = value.doBalanced();
      }
    this.setState({trees: keys});
    console.log("keys",Object.keys(this.state.trees));
    return keys;
  }

  handleChange(evt) {
    evt.preventDefault();
    var file = evt.target.files[0];
    var reader = new FileReader();
      reader.onload = (e) =>  {
        this.setState({dataList: e.target.result});
      }
    reader.readAsText(file);
    }

  render() {
    var {dataList, searchText, trees} = this.state;
    return (
      <div className="text">
        <p>
          Load a database

          </p>
      <div className="leftSide">
        <input className="fileInput" type="file" onChange={(e) => this.handleChange(e)}/>
        <Button onPress={() => this.onSubmit1(JSON.parse(dataList))}>
          <Image
            source={require("./images/magnifyingGlass.jpg")}
            style={{ width: 50, height: 50 }}
          />
      </Button></div>
        <p>
          Load a new element

          </p>
    <div className="leftSide">
      <input className="fileInput" name="add a student/group of students" type="file" onChange={(e) => this.handleChange(e)}/>
      <Button onPress={() => this.onSubmit(JSON.parse(dataList), trees)}>
        <Image
          source={require("./images/magnifyingGlass.jpg")}
          style={{ width: 50, height: 50 }}
        />
    </Button></div>
      <div className="board">
        <header>
          <img src={search} alt="search" />
        </header>
        <pre>
          <div>
            <View
              style={{
                flexDirection: "row",
                width: window.width,
                margin: 10,
                padding: 4,
                alignItems: "center",
                justifyContent: "center",
                borderWidth: 4,
                borderColor: "#888",
                borderRadius: 10,
                backgroundColor: "#fff"
              }}
            >
              <View style={{ flex: 4 }}>
                <TextInput
                  onChangeText={textEntry => {
                    this.setState({ searchText: textEntry });
                  }}
                  style={{ backgroundColor: "transparent" }}
                />
              </View>

              <View style={{ flex: 1 }}>
                <Button onPress={() => this.onSubmit(searchText)}>
                  <Image
                    source={require("./images/magnifyingGlass.jpg")}
                    style={{ width: 50, height: 50 }}
                  />
                </Button>
              </View>
            </View>
            <View>
              <image className="imagePreview">
                {treeify.asTree(trees[searchText], true)}
              </image>
            </View>
          </div>
        </pre>
      </div>
      </div>
    );
  }
}

export default App;
