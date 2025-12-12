import 'dart:math';

import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:appinio_swiper/appinio_swiper.dart';
import 'package:tinder_clone/Models/PeopleList.dart';
import 'package:tinder_clone/Widgets/MatchCard.dart';
import 'package:tinder_clone/Services/api_service.dart';

class TinderTab extends StatefulWidget {
  @override
  _TinderTabState createState() => _TinderTabState();
}

class _TinderTabState extends State<TinderTab> {
  bool chng = true;
  bool atCenter = true;
  bool _triggerNotFound = false;
  bool _timeout = false;
  late AppinioSwiperController _cardController;
  int currentIndex = 0;
  
  bool _isLoading = true;
  List<MatchCard> _peoples = [];

  @override
  void initState() {
    super.initState();
    _cardController = AppinioSwiperController();
    _loadUsers();
  }
  
  void _loadUsers() async {
    // Fetch from API
    List<MatchCard> users = await ApiService.fetchUsers();
    
    setState(() {
      // If API returns empty, fallback to static list
      if (users.isEmpty) {
        _peoples = peoples; 
      } else {
        _peoples = users;
      }
      _isLoading = false;
    });
  }

  @override
  void dispose() {
    _cardController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    if (_isLoading) {
      return Center(child: CircularProgressIndicator());
    }
    return Stack(
      children: <Widget>[
        AnimatedContainer(
          duration: Duration(milliseconds: 600),
          curve: Curves.fastLinearToSlowEaseIn,
          color: !atCenter
              ? chng ? Colors.pinkAccent.shade200 : Colors.tealAccent.shade200
              : Colors.blue.shade50,
          child: Center(
            child: _triggerNotFound
                ? !_timeout
                    ? Column(
                        mainAxisAlignment: MainAxisAlignment.center,
                        children: <Widget>[
                          CircularProgressIndicator(),
                          SizedBox(
                            height: ScreenUtil().setHeight(30.0),
                          ),
                          Text(
                            "Searching nearby matchings ...",
                            style: TextStyle(
                                fontSize: ScreenUtil().setSp(60.0),
                                fontWeight: FontWeight.w200,
                                color: Colors.grey.shade600),
                          )
                        ],
                      )
                    : Column(
                        mainAxisAlignment: MainAxisAlignment.start,
                        children: <Widget>[
                          SizedBox(
                            height: ScreenUtil().setHeight(550.0),
                          ),
                          ClipRRect(
                            borderRadius: BorderRadius.circular(100.0),
                            child: Image(
                                width: ScreenUtil().setWidth(400),
                                height: ScreenUtil().setWidth(400),
                                fit: BoxFit.cover,
                                image:
                                    AssetImage('assets/images/abhishekProfile.JPG')),
                          ),
                          SizedBox(
                            height: ScreenUtil().setHeight(40.0),
                          ),
                          Padding(
                            padding: EdgeInsets.symmetric(
                                horizontal: ScreenUtil().setWidth(60.0)),
                            child: Text("There is no one new around you ...",
                                textAlign: TextAlign.center,
                                style: TextStyle(
                                    wordSpacing: 1.2,
                                    fontSize: ScreenUtil().setSp(55.0),
                                    fontWeight: FontWeight.w300,
                                    color: Colors.grey.shade600)),
                          )
                        ],
                      )
                : Container(),
          ),
        ),
        Positioned(
          bottom: 0.0,
          child: Container(
            height: ScreenUtil().setWidth(220.0),
            width: MediaQuery.of(context).size.width,
            child: Row(
              mainAxisAlignment: MainAxisAlignment.spaceEvenly,
              children: <Widget>[
                Container(
                  padding: EdgeInsets.all(ScreenUtil().setWidth(15.0)),
                  height: ScreenUtil().setHeight(80.0),
                  width: ScreenUtil().setHeight(80.0),
                  decoration: BoxDecoration(
                      boxShadow: [
                        BoxShadow(
                            offset: Offset(0.0, 0.0), color: Colors.grey),
                        BoxShadow(
                            offset: Offset(1.0, 1.0),
                            color: Colors.grey,
                            blurRadius: 5.0),
                        BoxShadow(
                            offset: Offset(-1.0, -1.0),
                            color: Colors.white,
                            blurRadius: 10.0)
                      ],
                      color: Colors.white,
                      borderRadius: BorderRadius.circular(60.0)),
                  child: ShaderMask(
                      child: Image(
                          image: AssetImage('assets/images/round.png')),
                      blendMode: BlendMode.srcATop,
                      shaderCallback: (Rect bounds) {
                        return LinearGradient(
                            colors: [
                              Colors.amber.shade700,
                              Colors.amber.shade400
                            ],
                            begin: Alignment.topRight,
                            end: Alignment.bottomLeft,
                            stops: [0.0, 1.0]).createShader(bounds);
                      }),
                ),
                GestureDetector(
                  onTap: () {
                    _cardController.swipeLeft();
                  },
                  child: Container(
                    padding: EdgeInsets.all(ScreenUtil().setSp(30.0)),
                    height: ScreenUtil().setHeight(110.0),
                    width: ScreenUtil().setHeight(110.0),
                    decoration: BoxDecoration(
                        boxShadow: [
                          BoxShadow(
                              offset: Offset(0.0, 0.0), color: Colors.grey),
                          BoxShadow(
                              offset: Offset(1.0, 1.0),
                              color: Colors.grey,
                              blurRadius: 5.0),
                          BoxShadow(
                              offset: Offset(-1.0, -1.0),
                              color: Colors.white,
                              blurRadius: 10.0)
                        ],
                        color: Colors.white,
                        borderRadius: BorderRadius.circular(60.0)),
                    child: ShaderMask(
                        child: Image(
                          image: AssetImage('assets/images/closeRounded.png'),
                        ),
                        blendMode: BlendMode.srcATop,
                        shaderCallback: (Rect bounds) {
                          return LinearGradient(
                              colors: [
                                Theme.of(context).colorScheme.secondary,
                                Theme.of(context).primaryColor
                              ],
                              begin: Alignment.topRight,
                              end: Alignment.bottomLeft,
                              stops: [0.0, 1.0]).createShader(bounds);
                        }),
                  ),
                ),
                Container(
                  height: ScreenUtil().setHeight(80.0),
                  width: ScreenUtil().setHeight(80.0),
                  decoration: BoxDecoration(
                      boxShadow: [
                        BoxShadow(
                            offset: Offset(0.0, 0.0), color: Colors.grey),
                        BoxShadow(
                            offset: Offset(1.0, 1.0),
                            color: Colors.grey,
                            blurRadius: 5.0),
                        BoxShadow(
                            offset: Offset(-1.0, -1.0),
                            color: Colors.white,
                            blurRadius: 10.0)
                      ],
                      color: Colors.white,
                      borderRadius: BorderRadius.circular(60.0)),
                  child: ShaderMask(
                      child: Icon(
                        Icons.star,
                        size: ScreenUtil().setHeight(65.0),
                      ),
                      blendMode: BlendMode.srcATop,
                      shaderCallback: (Rect bounds) {
                        return LinearGradient(
                            colors: [
                              Colors.blue.shade600,
                              Colors.blue.shade300
                            ],
                            begin: Alignment.topRight,
                            end: Alignment.bottomLeft,
                            stops: [0.0, 1.0]).createShader(bounds);
                      }),
                ),
                GestureDetector(
                  onTap: () {
                    _cardController.swipeRight();
                  },
                  child: Container(
                    padding: EdgeInsets.all(ScreenUtil().setSp(30.0)),
                    height: ScreenUtil().setHeight(110.0),
                    width: ScreenUtil().setHeight(110.0),
                    decoration: BoxDecoration(
                        boxShadow: [
                          BoxShadow(
                              offset: Offset(0.0, 0.0), color: Colors.grey),
                          BoxShadow(
                              offset: Offset(1.0, 1.0),
                              color: Colors.grey,
                              blurRadius: 5.0),
                          BoxShadow(
                              offset: Offset(-1.0, -1.0),
                              color: Colors.white,
                              blurRadius: 10.0)
                        ],
                        color: Colors.white,
                        borderRadius: BorderRadius.circular(60.0)),
                    child: ShaderMask(
                        child: Icon(
                          Icons.favorite,
                          size: ScreenUtil().setHeight(65.0),
                        ),
                        blendMode: BlendMode.srcATop,
                        shaderCallback: (Rect bounds) {
                          return LinearGradient(
                              colors: [
                                Colors.tealAccent.shade700,
                                Colors.tealAccent.shade200
                              ],
                              begin: Alignment.topRight,
                              end: Alignment.bottomLeft,
                              stops: [0.0, 1.0]).createShader(bounds);
                        }),
                  ),
                ),
                Container(
                  padding: EdgeInsets.all(ScreenUtil().setWidth(15.0)),
                  height: ScreenUtil().setHeight(80.0),
                  width: ScreenUtil().setHeight(80.0),
                  decoration: BoxDecoration(
                      boxShadow: [
                        BoxShadow(
                            offset: Offset(0.0, 0.0), color: Colors.grey),
                        BoxShadow(
                            offset: Offset(1.0, 1.0),
                            color: Colors.grey,
                            blurRadius: 5.0),
                        BoxShadow(
                            offset: Offset(-1.0, -1.0),
                            color: Colors.white,
                            blurRadius: 10.0)
                      ],
                      color: Colors.white,
                      borderRadius: BorderRadius.circular(60.0)),
                  child: ShaderMask(
                      child: Image(
                          image: AssetImage('assets/images/lighting.png')),
                      blendMode: BlendMode.srcATop,
                      shaderCallback: (Rect bounds) {
                        return LinearGradient(
                            colors: [
                              Colors.purple.shade500,
                              Colors.purple.shade200
                            ],
                            begin: Alignment.topRight,
                            end: Alignment.bottomLeft,
                            stops: [0.0, 1.0]).createShader(bounds);
                      }),
                )
              ],
            ),
          ),
        ),
        Align(
          alignment: Alignment.topCenter,
          child: SizedBox(
            height: MediaQuery.of(context).size.height * 0.74,
            child: AppinioSwiper(
              controller: _cardController,
              cardCount: _peoples.length,
              cardBuilder: (BuildContext context, int index) {
                return _peoples[index];
              },
              onEnd: () {
                // Called when all cards have been swiped
                setState(() {
                  _triggerNotFound = true;
                  Future.delayed(Duration(seconds: 5), () {
                    _timeout = true;
                    setState(() {});
                  });
                });
              },
              onCardPositionChanged: (SwiperPosition position) {
                // Track swipe direction for background color change
                if (position.offset.dx < -20) {
                  setState(() {
                    atCenter = false;
                    chng = true;
                  });
                } else if (position.offset.dx > 20) {
                  setState(() {
                    atCenter = false;
                    chng = false;
                  });
                } else {
                  setState(() {
                    atCenter = true;
                  });
                }
              },
            ),
          ),
        ),
      ],
    );
  }

  double abs(double x) {
    if (x < 0) return x * -1;
    return x;
  }
}
