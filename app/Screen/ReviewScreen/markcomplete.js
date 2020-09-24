import React, {Component} from 'react';
import {
  Text,
  TextInput,
  View,
  Dimensions,
  Modal,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {Button} from 'galio-framework';
import Theme from '../../constants/Theme';
import firestore from '@react-native-firebase/firestore';
import LoadingComponent from '../../Component/Loader';

const {width, height} = Dimensions.get('screen');
export default class Rating extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      amount: '0',
    };
  }
  render() {
    return (
      <React.Fragment>
        <Modal
          animationType="fade"
          transparent={true}
          visible={this.props.open}
          onRequestClose={() => this.props.close()}>
          <ScrollView>
            {this.state.isLoading && <Loading />}
            <View
              style={{
                flexDirection: 'column',
                height: height,
              }}>
              <View
                style={{
                  flex: 1,
                  backgroundColor: 'black',
                  opacity: 0.5,
                }}>
                <Button
                  style={{
                    height: '100%',
                    width: '100%',
                    backgroundColor: 'transparent',
                  }}
                  onPress={() => this.props.close()}></Button>
              </View>
              <View
                style={{
                  flex: 0.8,
                  backgroundColor: 'white',
                }}>
                <View
                  style={{
                    paddingHorizontal: 10,
                    paddingTop: 10,
                  }}>
                  <ScrollView>
                    {this.state.loading && <LoadingComponent />}

                    <View
                      style={{
                        padding: 20,
                      }}>
                      <Text>Enter Amount</Text>
                      <TextInput
                        style={{
                          borderWidth: 1,
                          borderRadius: 15,
                          textAlign: 'center',
                          marginVertical: 15,
                        }}
                        placeholder="Amount"
                        value={this.state.amount}
                        onChangeText={(e) => this.setState({amount: e})}
                        keyboardType="decimal-pad"
                      />
                      <TouchableOpacity
                        onPress={async () => {
                          console.log('fafa');
                          this.setState({loading: true});
                          await firestore()
                            .collection('jobs')
                            .doc(this.props.data.id)
                            .update({
                              status: 'completed',
                              cost: JSON.stringify(this.state.amount),
                            });
                          const funds = await firestore()
                            .collection('funds')
                            .doc(this.props.data.sellerId)
                            .get();
                          let newFunds = funds.data();
                          await firestore()
                            .collection('funds')
                            .doc(this.props.data.sellerId)
                            .update({
                              cash:
                                newFunds.cash == ''
                                  ? parseInt(this.state.amount)
                                  : parseInt(newFunds.cash) + parseInt(this.state.amount),
                              monthly:
                                newFunds.monthly == ''
                                  ? parseInt(this.state.amount)
                                  : parseInt(newFunds.monthly) +
                                    parseInt(this.state.amount),
                              total:
                                newFunds.total == ''
                                  ? parseInt(this.state.amount)
                                  : parseInt(newFunds.total) +
                                    parseInt(this.state.amount),
                            });
                          this.setState({loading: false});
                          this.props.close();
                        }}>
                        <Text
                          style={{
                            backgroundColor: Theme.COLORS.SEAGREEN,
                            padding: 5,
                            paddingVertical: 10,
                            borderRadius: 5,
                            textAlign: 'center',
                            color: 'white',
                          }}>
                          Submit
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </ScrollView>
                </View>
              </View>
            </View>
          </ScrollView>
        </Modal>
      </React.Fragment>
    );
  }
}
