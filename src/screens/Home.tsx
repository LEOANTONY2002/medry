import {
  Button,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  ToastAndroid,
  TouchableHighlight,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import axios from 'axios';
import SoundPlayer from 'react-native-sound-player';

const Home = () => {
  const [loading, setLoading] = useState(false);
  const [content, setContent] = useState<any>(null);
  const [error, setError] = useState<String | null>(null);
  const [word, setWord] = useState('');

  const fetchContent = async () => {
    try {
      const {data} = await axios.get(
        `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`,
      );
      setContent(data);
    } catch (error) {
      setError('No result found! Chcek your spelling!');
    }
  };

  const playAudio = async () => {
    try {
      await SoundPlayer.playUrl(content[0]?.phonetics[0]?.audio);
    } catch (error) {
      console.log(error);
      console.log(content[0]?.phonetics[0]?.audio);
    }
  };

  return (
    <SafeAreaView style={styles.home}>
      {/* <TouchableHighlight style={styles.h_nav}>
        <View style={styles.hn_btn}>
          <Image source={require('../assets/images/BookmarkF.png')} />
        </View>
      </TouchableHighlight> */}

      <View style={{width: '80%', margin: '10%', marginTop: 80}}>
        <View style={styles.search}>
          <TextInput
            style={styles.input}
            onChangeText={text => setWord(text)}
            placeholder="Type a word"
            placeholderTextColor={'lightgray'}
          />
          <TouchableHighlight
            onPress={() => fetchContent()}
            style={styles.searchBtn}>
            <LinearGradient
              colors={['#FF3F3F', '#FF0000']}
              useAngle={true}
              style={styles.searchGrad}
              angle={120}>
              <Image source={require('../assets/images/Search.png')} />
            </LinearGradient>
          </TouchableHighlight>
        </View>
        {content ? (
          <>
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginBottom: 30,
              }}>
              <View>
                <Text style={styles.h1}>{content[0]?.word}</Text>
                <Text style={styles.span}>{content[0]?.phonetic}</Text>
              </View>
              <TouchableOpacity
                onPress={() => playAudio()}
                style={{
                  backgroundColor: 'white',
                  borderRadius: 50,
                  height: 60,
                  width: 60,
                }}>
                <LinearGradient
                  colors={['#FFF4F4', '#FFFFFF']}
                  useAngle={true}
                  style={styles.audioBtn}
                  angle={120}>
                  <Image source={require('../assets/images/Voice.png')} />
                </LinearGradient>
              </TouchableOpacity>
            </View>
            <Text style={styles.pos}>
              {content[0]?.meanings[0]?.partOfSpeech}
            </Text>
            <Text style={styles.p}>
              {content[0]?.meanings[0]?.definitions[0]?.definition}
            </Text>
          </>
        ) : (
          <Text style={styles.noContent}>Search Something.</Text>
        )}
      </View>
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  home: {
    width: '100%',
    height: '100%',
    backgroundColor: '#FFF4F4',
  },
  h_nav: {
    alignItems: 'flex-end',
    justifyContent: 'flex-start',
    marginTop: 20,
  },
  hn_btn: {
    backgroundColor: '#F90000',
    width: 60,
    height: 50,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
  },
  search: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 60,
  },
  input: {
    height: 50,
    backgroundColor: 'white',
    borderRadius: 10,
    paddingLeft: 15,
    elevation: 20,
    shadowColor: '#FFB5B5',
    shadowOffset: {width: 0, height: 15},
    shadowOpacity: 1,
    flex: 1,
  },
  searchBtn: {
    elevation: 30,
    shadowColor: 'red',
    shadowOffset: {width: 0, height: 15},
    shadowOpacity: 1,
    marginLeft: -50,
    backgroundColor: 'red',
    borderRadius: 50,
  },
  searchGrad: {
    width: 60,
    height: 60,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
  },
  h1: {
    fontSize: 42,
    fontWeight: '900',
    color: 'black',
  },
  span: {
    color: '#727272',
  },
  pos: {
    color: 'red',
    marginVertical: 20,
  },
  p: {
    color: 'black',
    fontSize: 20,
    fontWeight: '600',
  },
  audioBtn: {
    elevation: 20,
    shadowColor: '#FFB5B5',
    shadowOffset: {width: 0, height: 15},
    shadowOpacity: 1,
    padding: 20,
    backgroundColor: '#FFFFF4',
    alignSelf: 'flex-start',
    borderRadius: 50,
  },
  noContent: {
    fontSize: 48,
    fontWeight: '900',
    color: '#FF0000',
    opacity: 0.1,
  },
});
