// ignore_for_file: file_names
import 'package:app_aep/components/button-padding.dart';
import 'package:app_aep/components/page.dart';
import 'package:app_aep/screens/home-page.dart';
import 'package:app_aep/screens/register-page.dart';
import 'package:flutter/material.dart';

class LoginPage extends StatelessWidget {
  const LoginPage({
    super.key,
  });

  @override
  Widget build(BuildContext context) {
    return CustomPage(
      screenText: 'Tela de Login',
      botoes: const [
        CustomButtonPadding(textValue: 'Acessar', toPage: HomePage(),),
        CustomButtonPadding(textValue: 'Registrar', toPage: RegisterPage(),),
      ],
    );
  }
}
