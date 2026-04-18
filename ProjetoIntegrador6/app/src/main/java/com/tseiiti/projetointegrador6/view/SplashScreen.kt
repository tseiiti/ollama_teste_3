package com.tseiiti.projetointegrador6.view

import androidx.compose.foundation.Image
import androidx.compose.foundation.background
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.size
import androidx.compose.runtime.Composable
import androidx.compose.runtime.LaunchedEffect
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.res.painterResource
import androidx.compose.ui.tooling.preview.Preview
import androidx.compose.ui.unit.dp
import androidx.navigation.NavController
import androidx.navigation.compose.rememberNavController
import com.tseiiti.projetointegrador6.R
import com.tseiiti.projetointegrador6.ui.theme.White
import kotlinx.coroutines.delay

@Composable
fun SplashScreen(navController: NavController) {
    LaunchedEffect(key1 = true) {
        delay(3000)
        navController.navigate(route = "home") {
            popUpTo(route = "splash") { inclusive = true }
        }
    }

    Column(
        modifier = Modifier.fillMaxSize().background(color = White),
        verticalArrangement = Arrangement.Center,
        horizontalAlignment = Alignment.CenterHorizontally
    ) {
        Image(
            painter = painterResource(id = R.drawable.ic_splash),
            contentDescription = null,
            modifier = Modifier.size(400.dp)
        )
    }
}

@Preview
@Composable
private fun SplashScreenPreview() {
    SplashScreen(navController = rememberNavController())
}