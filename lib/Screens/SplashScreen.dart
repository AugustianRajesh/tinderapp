
import 'dart:async';

import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:tinder_clone/Screens/LoginScreen.dart';


class SplashScreen extends StatefulWidget {

  @override
  _SplashScreenState createState() => _SplashScreenState();
}

class _SplashScreenState extends State<SplashScreen> {
  @override
  void initState() { 
    super.initState();
    Timer(new Duration(seconds: 2),(){
      Navigator.pop(context);
      Navigator.push(context, MaterialPageRoute(builder: (context) =>  LoginScreen())) ;
    });
  }

  @override
  Widget build(BuildContext context) {
    return ScreenUtilInit(
      designSize: Size(750, 1334),
      builder: (context, child) => Scaffold(
        backgroundColor: Colors.white,
        body: Center(
          child: Image(
            width: ScreenUtil().setWidth(200.0),
            height: ScreenUtil().setHeight(200.0),
            image: AssetImage('assets/images/tinder_logo.png'),
          ),
        ),
      ),
    );
  }
}