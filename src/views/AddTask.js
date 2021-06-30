import React, { Component } from "react";
import {
	Modal,
	View,
	Text,
	StyleSheet,
	TouchableOpacity,
	TouchableWithoutFeedback,
	TextInput,
	Platform,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import moment from "moment";

import commomStyles from "../commomStyles";

const initialState = {
	desc: "",
	date: new Date(),
	showDatePicker: false,
};
export default class AddTask extends Component {
	state = { ...initialState };

	save = () => {
		const newTask = { ...this.state };

		// if (this.props.onSave) {
		// 	this.props.onSave(newTask);
		// }

		this.props.onSave && this.props.onSave(newTask);

		this.setState({ ...initialState });
	};

	getDateTimePicker = () => {
		let datePicker = (
			<DateTimePicker
				value={this.state.date}
				onChange={(event, date) => {
					if (date) {
						this.setState({ date, showDatePicker: false });
					}
				}}
				mode="date"
				// display="spinner"
			/>
		);
		const dateString = moment(this.state.date).format("LL");

		if (Platform.OS == "android") {
			datePicker = (
				<View>
					<TouchableOpacity
						onPress={() => {
							this.setState({ showDatePicker: true });
						}}
					>
						<Text style={styles.date}>{dateString}</Text>
					</TouchableOpacity>
					{this.state.showDatePicker && datePicker}
				</View>
			);
		}

		return datePicker;
	};

	render() {
		return (
			<Modal
				transparent={true}
				visible={this.props.isVisible}
				animationType={"slide"}
			>
				<TouchableWithoutFeedback onPress={this.props.onCancel}>
					<View style={styles.background}></View>
				</TouchableWithoutFeedback>
				<View style={styles.container}>
					<Text style={styles.header}>Nova Tarefa</Text>
					<TextInput
						style={styles.input}
						placeholder="informe a descricao"
						onChangeText={(desc) => this.setState({ desc })}
						value={this.state.desc}
					/>
					{this.getDateTimePicker()}

					<View style={styles.buttons}>
						<TouchableOpacity onPress={this.props.onCancel}>
							<Text style={styles.button}>Cancelar</Text>
						</TouchableOpacity>
						<TouchableOpacity>
							<Text style={styles.button} onPress={this.save}>
								Salvar
							</Text>
						</TouchableOpacity>
					</View>
				</View>
				<TouchableWithoutFeedback onPress={this.props.onCancel}>
					<View style={styles.background}></View>
				</TouchableWithoutFeedback>
			</Modal>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: "#fff",
	},
	background: {
		flex: 1,
		backgroundColor: "rgba(0,0,0,0.7)",
	},
	header: {
		backgroundColor: commomStyles.colors.today,
		color: commomStyles.colors.secondary,
		textAlign: "center",
		padding: 15,
		fontSize: 18,
	},
	input: {
		height: 40,
		paddingHorizontal: 10,
		margin: 15,
		backgroundColor: "#fff",
		borderColor: "#e3e3e3",
		borderWidth: 1,
		borderRadius: 15,
	},
	buttons: {
		flexDirection: "row",
		justifyContent: "flex-end",
	},
	button: {
		color: commomStyles.colors.today,
		margin: 20,
		marginRight: 30,
	},
	date: {
		fontSize: 20,
		marginLeft: 15,
	},
});
