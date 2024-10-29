import 'package:app_aep/components/button-padding.dart';
import 'package:app_aep/components/page.dart';
import 'package:app_aep/screens/register-page.dart';
import 'package:flutter/material.dart';

class HomePage extends StatelessWidget {
  const HomePage({super.key});

  @override
  Widget build(BuildContext context) {
    return CustomPage(screenText: 'home', botoes: const [
      CustomButtonPadding(
        textValue: 'home',
        toPage: RegisterPage(),
      ),
      CustomButtonPadding(
        textValue: 'home',
        toPage: RegisterPage(),
      )
    ]);
  }
}
