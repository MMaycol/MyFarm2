import React from 'react';

import { StyleSheet, Text, View, ActivityIndicator, ScrollView, TextInput } from 'react-native';

//Componentes

class CompraView extends React.Component {
    constructor(props) {
        super();
        this.props = props;
        this.state = {
            isLoading: true,
            Dataset: []
        }

       
    }


    render() {

        return (<ScrollView style={styles.CardStyles}>
            
        </ScrollView> )
    }
}

export { CompraView }

const styles = StyleSheet.create({
    CardStyles:{
      flex: 5,
     width: "100%",
      backgroundColor: 'white'
        },
    text_input: {
      width: "92%",
      margin: 8,
      padding: 10,
      borderRadius: 4,
      elevation: 4,
      border: '3px solid #c6c6c6',
      borderRadius: '10px'
    }
    
  });