import { StyleSheet, Text, View, Button} from 'react-native';

const LoginView = (props) => {

    return (<View style={styles.CardStyle}>
        <Text style={styles.Title}>Acceso</Text>
        <View style={styles.OptionContainer}>
            <Button title = "Iniciar sesion" onPress={() => {
                props.navigation.navigate('MainView');
            }}></Button>
        </View>
        
    </View>);
}

export { LoginView }

const styles = StyleSheet.create({
    CardStyle: {
        flex: 1,
        backgroundColor: '#999',
        padding: 20
    }, Title: {
        flex: 1,
        color: "white",
        fontSize: 26,
        justifyContent: 'center'
    }, OptionContainer: {
        flex: 3
    }
});